use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateMilestone {
    pub project_id: i32,
    pub milestone_name: String,
    pub due_date: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateMilestone {
    pub milestone_name: String,
}