use axum::{
    Json,
    response::IntoResponse,
};

use sqlx::PgPool;

use crate::models::activity_log::ActivityLog;

pub async fn get_logs() -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let logs =
        sqlx::query_as::<_, ActivityLog>(
            "SELECT id, activity
             FROM activity_logs
             ORDER BY id DESC"
        )
        .fetch_all(&pool)
        .await
        .unwrap();

    Json(logs)
}