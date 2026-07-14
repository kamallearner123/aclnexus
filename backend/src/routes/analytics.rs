use axum::{
    Json,
    response::IntoResponse,
};

use sqlx::PgPool;

use crate::models::analytics::Analytics;

pub async fn get_analytics() -> impl IntoResponse {

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

    let active_projects: (i64,) =
        sqlx::query_as(
            "SELECT COUNT(*) FROM projects
             WHERE status = 'Active'"
        )
        .fetch_one(&pool)
        .await
        .unwrap();

    let completed_projects: (i64,) =
        sqlx::query_as(
            "SELECT COUNT(*) FROM projects
             WHERE status = 'Completed'"
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
    let completion_percentage =
    if total_tasks.0 > 0 {
        (completed_tasks.0 as f64
            / total_tasks.0 as f64)
            * 100.0
    } else {
        0.0
    };

    Json(
        Analytics {
    total_projects: total_projects.0,
    active_projects: active_projects.0,
    completed_projects: completed_projects.0,
    total_tasks: total_tasks.0,
    completed_tasks: completed_tasks.0,
    pending_tasks: pending_tasks.0,
    project_completion: completion_percentage,
}
    )
}