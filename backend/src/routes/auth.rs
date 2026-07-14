use axum::{
    Json,
    response::IntoResponse,
};

use bcrypt::{hash, verify, DEFAULT_COST};
use sqlx::PgPool;
use crate::models::user::ResetPassword;
use crate::models::user::{
    RegisterUser,
    LoginUser,
    ChangePassword,
    SendOtp,
    VerifyOtp,
};

use lettre::{
    Message,
    SmtpTransport,
    Transport,
    transport::smtp::authentication::Credentials,
};

use rand::Rng;

use crate::utils::jwt::create_token;

pub async fn register(
    Json(payload): Json<RegisterUser>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let hashed_password =
        hash(payload.password, DEFAULT_COST)
            .unwrap();

    sqlx::query(
        "INSERT INTO users
        (company_id, role_id, name, email, password_hash)
        VALUES ($1,$2,$3,$4,$5)"
    )
    .bind(payload.company_id)
    .bind(payload.role_id)
    .bind(payload.name)
    .bind(payload.email)
    .bind(hashed_password)
    .execute(&pool)
    .await
    .unwrap();

    Json("User Registered Successfully")
}


pub async fn login(
    Json(payload): Json<LoginUser>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let user = sqlx::query_as::<_, (String,)>(
        "SELECT password_hash
         FROM users
         WHERE email = $1"
    )
    .bind(&payload.email)
    .fetch_optional(&pool)
    .await
    .unwrap();

    match user {

        Some((stored_hash,)) => {

            let valid =
                verify(
                    payload.password,
                    &stored_hash
                )
                .unwrap();

            if valid {

    let token =
        create_token(
            &payload.email
        );

    Json(token)

} else {

    Json("Invalid Credentials".to_string())
}
        }

        None => {

            Json("User Not Found".to_string())
        }
    }
}
#[derive(serde::Deserialize)]
pub struct ProfileRequest {
    pub email: String,
}
pub async fn profile(
    Json(payload): Json<ProfileRequest>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .unwrap();

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let user = sqlx::query!(
        r#"
        SELECT
            users.name,
            users.email,
            roles.role_name
        FROM users
        JOIN roles
        ON users.role_id = roles.id
        WHERE users.email = $1
        "#,
        payload.email
    )
    .fetch_one(&pool)
    .await
    .unwrap();

    Json(serde_json::json!({
        "name": user.name,
        "email": user.email,
        "role": user.role_name
    }))
}
pub async fn reset_password(
    Json(payload): Json<ResetPassword>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let hashed_password =
        hash(payload.password, DEFAULT_COST)
            .unwrap();

    sqlx::query(
        "UPDATE users
         SET password_hash = $1
         WHERE email = $2"
    )
    .bind(hashed_password)
    .bind(payload.email)
    .execute(&pool)
    .await
    .unwrap();

    Json("Password Updated")
}
pub async fn change_password(
    Json(payload): Json<ChangePassword>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let hashed_password =
        hash(payload.password, DEFAULT_COST)
            .unwrap();

    sqlx::query(
        "UPDATE users
         SET password_hash = $1
         WHERE email = $2"
    )
    .bind(hashed_password)
    .bind(payload.email)
    .execute(&pool)
    .await
    .unwrap();

    Json("Password Updated")
}
pub async fn send_otp(
    Json(payload): Json<SendOtp>,
) -> impl IntoResponse {

    let otp: u32 =
        rand::thread_rng()
            .gen_range(100000..999999);

    let otp_string =
        otp.to_string();

    let database_url =
        std::env::var("DATABASE_URL")
            .unwrap();

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    sqlx::query(
        "INSERT INTO otp_verifications
        (email, otp)
        VALUES ($1,$2)"
    )
    .bind(&payload.email)
    .bind(&otp_string)
    .execute(&pool)
    .await
    .unwrap();

    let gmail_user =
        std::env::var("GMAIL_USER")
            .unwrap();

    let gmail_pass =
        std::env::var("GMAIL_PASS")
            .unwrap();

    let email = Message::builder()
        .from(gmail_user.parse().unwrap())
        .to(payload.email.parse().unwrap())
        .subject("ProjectPilot OTP")
        .body(format!(
            "Your OTP is {}",
            otp_string
        ))
        .unwrap();

    let creds =
        Credentials::new(
            gmail_user,
            gmail_pass,
        );

    let mailer =
        SmtpTransport::relay(
            "smtp.gmail.com"
        )
        .unwrap()
        .credentials(creds)
        .build();

    mailer.send(&email).unwrap();

    Json("OTP Sent Successfully")
}
pub async fn verify_otp(
    Json(payload): Json<VerifyOtp>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .unwrap();

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let otp = sqlx::query_as::<_, (String,)>(
        "SELECT otp
         FROM otp_verifications
         WHERE email = $1
         ORDER BY id DESC
         LIMIT 1"
    )
    .bind(&payload.email)
    .fetch_optional(&pool)
    .await
    .unwrap();

    match otp {

        Some((stored_otp,)) => {

            if stored_otp == payload.otp {

                Json("OTP Verified")

            } else {

                Json("Invalid OTP")
            }
        }

        None => {

            Json("OTP Not Found")
        }
    }
}