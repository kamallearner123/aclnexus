use axum::{
    Json,
    response::IntoResponse,
};

use sqlx::PgPool;

use crate::models::team_member::CreateTeamMember;

pub async fn create_team_member(
    Json(payload): Json<CreateTeamMember>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    sqlx::query(
        "INSERT INTO users
        (company_id, role_id, name, email)
        VALUES ($1,$2,$3,$4)"
    )
    .bind(payload.company_id)
    .bind(payload.role_id)
    .bind(payload.name)
    .bind(payload.email)
    .execute(&pool)
.await
.unwrap();

sqlx::query(
    "INSERT INTO activity_logs(activity)
     VALUES ($1)"
)
.bind("Team Member Added")
.execute(&pool)
.await
.unwrap();

Json("Team Member Added")
}

use serde::Serialize;

#[derive(Serialize, sqlx::FromRow)]
pub struct TeamMember {
    pub id: i32,
    pub company_id: i32,
    pub role_id: i32,
    pub name: String,
    pub email: String,
}

pub async fn get_team_members() -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let users =
        sqlx::query_as::<_, TeamMember>(
            "SELECT
                id,
                company_id,
                role_id,
                name,
                email
             FROM users"
        )
        .fetch_all(&pool)
        .await
        .unwrap();

    Json(users)
}

use crate::models::team_member::UpdateTeamMember;

pub async fn update_team_member(
    axum::extract::Path(id): axum::extract::Path<i32>,
    Json(payload): Json<UpdateTeamMember>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    sqlx::query(
        "UPDATE users
         SET role_id = $1
         WHERE id = $2"
    )
    .bind(payload.role_id)
    .bind(id)
    .execute(&pool)
    .await
    .unwrap();

    Json("Team Member Updated")
}

pub async fn delete_team_member(
    axum::extract::Path(id): axum::extract::Path<i32>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    sqlx::query(
        "DELETE FROM users
         WHERE id = $1"
    )
    .bind(id)
    .execute(&pool)
    .await
    .unwrap();

    Json("Team Member Deleted")
}