use axum::{
    Json,
    response::IntoResponse,
};

use bcrypt::{hash, verify, DEFAULT_COST};
use sqlx::PgPool;

use crate::models::user::{RegisterUser, LoginUser};

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

                Json("Login Successful")

            } else {

                Json("Invalid Credentials")
            }
        }

        None => {

            Json("User Not Found")
        }
    }
}