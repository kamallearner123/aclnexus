use axum::{
    Json,
    response::IntoResponse,
};

use sqlx::PgPool;


use crate::models::role::{
    CheckRole,
    AdminRequest,
};

pub async fn check_role(
    Json(payload): Json<CheckRole>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let role =
        sqlx::query_as::<_, (i32,)>(
            "SELECT role_id
             FROM users
             WHERE email = $1"
        )
        .bind(payload.email)
        .fetch_optional(&pool)
        .await
        .unwrap();

    match role {

        Some((role_id,)) => {

            if role_id == 1 {

                Json("Admin")
            }
            else if role_id == 2 {

                Json("Manager")
            }
            else {

                Json("Employee")
            }
        }

        None => {

            Json("User Not Found")
        }
    }
}
pub async fn admin_only(
    Json(payload): Json<AdminRequest>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let role =
        sqlx::query_as::<_, (i32,)>(
            "SELECT role_id
             FROM users
             WHERE email = $1"
        )
        .bind(payload.email)
        .fetch_optional(&pool)
        .await
        .unwrap();

    match role {

        Some((role_id,)) => {

            if role_id == 1 {

                Json("Welcome Admin")
            } else {

                Json("Access Denied")
            }
        }

        None => {

            Json("User Not Found")
        }
    }
}