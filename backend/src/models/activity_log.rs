use serde::Serialize;

#[derive(Serialize, sqlx::FromRow)]
pub struct ActivityLog {
    pub id: i32,
    pub activity: String,
}