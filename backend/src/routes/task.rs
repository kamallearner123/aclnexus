use axum::{
    Json,
    response::IntoResponse,
};

use sqlx::PgPool;


use crate::models::task::{
    CreateTask,
    UpdateTask,
};

pub async fn create_task(
    Json(payload): Json<CreateTask>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    sqlx::query(
"INSERT INTO tasks
(project_id, task_name, status, due_date, assigned_to)
VALUES ($1,$2,$3,$4::date,$5)"
)
.bind(payload.project_id)
.bind(payload.task_name)
.bind(payload.status)
.bind(payload.due_date)
.bind(payload.assigned_to)
    .execute(&pool)
.await
.unwrap();

sqlx::query(
    "INSERT INTO activity_logs(activity)
     VALUES ($1)"
)
.bind("Task Created")
.execute(&pool)
.await
.unwrap();

Json("Task Created")
}

use serde::Serialize;

#[derive(Serialize, sqlx::FromRow)]
pub struct Task {
    pub id: i32,
    pub project_id: i32,
    pub task_name: String,
    pub status: String,
    pub assigned_to: Option<i32>,
}
#[derive(Serialize, sqlx::FromRow)]
pub struct EmployeeTask {
    pub id: i32,
    pub task_name: String,
    pub status: String,
}

pub async fn get_tasks() -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let tasks =
        sqlx::query_as::<_, Task>(
            "SELECT
    id,
    project_id,
    task_name,
    status,
    assigned_to
 FROM tasks"
        )
        .fetch_all(&pool)
        .await
        .unwrap();

    Json(tasks)
}

pub async fn update_task(
    axum::extract::Path(id): axum::extract::Path<i32>,
    Json(payload): Json<UpdateTask>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    sqlx::query(
        "UPDATE tasks
         SET status = $1
         WHERE id = $2"
    )
    .bind(payload.status)
    .bind(id)
    .execute(&pool)
    .await
    .unwrap();

    Json("Task Updated")
}

pub async fn delete_task(
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
        "DELETE FROM tasks
         WHERE id = $1"
    )
    .bind(id)
    .execute(&pool)
    .await
    .unwrap();

    Json("Task Deleted")
}
pub async fn get_employee_tasks(
    axum::extract::Path(user_id): axum::extract::Path<i32>,
) -> impl IntoResponse {

    let database_url =
        std::env::var("DATABASE_URL")
            .expect("DATABASE_URL not found");

    let pool =
        PgPool::connect(&database_url)
            .await
            .unwrap();

    let tasks =
        sqlx::query_as::<_, EmployeeTask>(
            "SELECT
                id,
                task_name,
                status
             FROM tasks
             WHERE assigned_to = $1"
        )
        .bind(user_id)
        .fetch_all(&pool)
        .await
        .unwrap();

    Json(tasks)
}