use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateTask {
    pub project_id: i32,
    pub task_name: String,
    pub status: String,
    pub due_date: String,
}