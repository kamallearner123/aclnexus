use sqlx::{Pool, Postgres};

pub async fn connect_db(database_url: &str) -> Pool<Postgres> {
    sqlx::PgPool::connect(database_url)
        .await
        .expect("Database connection failed")
}