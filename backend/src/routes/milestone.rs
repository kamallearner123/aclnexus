use axum::{
    Json,
    response::IntoResponse,
};

use sqlx::PgPool;

use crate::models::milestone::{
    CreateMilestone,
    UpdateMilestone,
};

pub async fn create_milestone(
    Json(payload): Json<CreateMilestone>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    sqlx::query(
        "INSERT INTO milestones
        (project_id, milestone_name, due_date)
        VALUES ($1,$2,$3::date)"
    )
    .bind(payload.project_id)
    .bind(payload.milestone_name)
    .bind(payload.due_date)
    .execute(&pool)
    .await
    .unwrap();

    Json("Milestone Created")
}

use serde::Serialize;

#[derive(Serialize, sqlx::FromRow)]
pub struct Milestone {
    pub id: i32,
    pub project_id: i32,
    pub milestone_name: String,
}

pub async fn get_milestones() -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let milestones =
        sqlx::query_as::<_, Milestone>(
            "SELECT
                id,
                project_id,
                milestone_name
             FROM milestones"
        )
        .fetch_all(&pool)
        .await
        .unwrap();

    Json(milestones)
}

pub async fn update_milestone(
    axum::extract::Path(id): axum::extract::Path<i32>,
    Json(payload): Json<UpdateMilestone>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    sqlx::query(
        "UPDATE milestones
         SET milestone_name = $1
         WHERE id = $2"
    )
    .bind(payload.milestone_name)
    .bind(id)
    .execute(&pool)
    .await
    .unwrap();

    Json("Milestone Updated")
}

pub async fn delete_milestone(
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
        "DELETE FROM milestones
         WHERE id = $1"
    )
    .bind(id)
    .execute(&pool)
    .await
    .unwrap();

    Json("Milestone Deleted")
}