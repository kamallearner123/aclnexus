use axum::{
    Json,
    response::IntoResponse,
};

use sqlx::PgPool;

use crate::models::project::CreateProject;
use serde::Serialize;

#[derive(Serialize, sqlx::FromRow)]
pub struct Project {
    pub id: i32,
    pub project_name: String,
    pub status: String,
}

pub async fn create_project(
    Json(payload): Json<CreateProject>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    sqlx::query(
        "INSERT INTO projects
        (company_id, project_name, description, status)
        VALUES ($1,$2,$3,$4)"
    )
    .bind(payload.company_id)
    .bind(payload.project_name)
    .bind(payload.description)
    .bind(payload.status)
    .execute(&pool)
.await
.unwrap();

sqlx::query(
    "INSERT INTO activity_logs(activity)
     VALUES ($1)"
)
.bind("Project Created")
.execute(&pool)
.await
.unwrap();

Json("Project Created")
}
pub async fn get_projects() -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let projects =
        sqlx::query_as::<_, Project>(
            "SELECT id,
                    project_name,
                    status
             FROM projects"
        )
        .fetch_all(&pool)
        .await
        .unwrap();

    Json(projects)
}
pub async fn delete_project(
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
        "DELETE FROM projects
         WHERE id = $1"
    )
    .bind(id)
    .execute(&pool)
    .await
    .unwrap();

    sqlx::query(
        "INSERT INTO activity_logs(activity)
         VALUES ($1)"
    )
    .bind("Project Deleted")
    .execute(&pool)
    .await
    .unwrap();

    Json("Project Deleted")
}