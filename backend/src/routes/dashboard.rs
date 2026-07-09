use axum::{
    Json,
    response::IntoResponse,
};

use sqlx::PgPool;

use crate::models::dashboard::DashboardStats;

pub async fn get_dashboard() -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let total_projects: (i64,) =
        sqlx::query_as(
            "SELECT COUNT(*) FROM projects"
        )
        .fetch_one(&pool)
        .await
        .unwrap();

    let total_tasks: (i64,) =
        sqlx::query_as(
            "SELECT COUNT(*) FROM tasks"
        )
        .fetch_one(&pool)
        .await
        .unwrap();

    let completed_tasks: (i64,) =
        sqlx::query_as(
            "SELECT COUNT(*) FROM tasks
             WHERE status = 'Completed'"
        )
        .fetch_one(&pool)
        .await
        .unwrap();

    let pending_tasks: (i64,) =
        sqlx::query_as(
            "SELECT COUNT(*) FROM tasks
             WHERE status = 'Pending'"
        )
        .fetch_one(&pool)
        .await
        .unwrap();

    let total_team_members: (i64,) =
        sqlx::query_as(
            "SELECT COUNT(*) FROM users"
        )
        .fetch_one(&pool)
        .await
        .unwrap();

    Json(
        DashboardStats {
            total_projects: total_projects.0,
            total_tasks: total_tasks.0,
            completed_tasks: completed_tasks.0,
            pending_tasks: pending_tasks.0,
            total_team_members: total_team_members.0,
        }
    )
}