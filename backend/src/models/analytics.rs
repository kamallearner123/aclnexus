use serde::Serialize;

#[derive(Serialize)]
pub struct Analytics {
    pub total_projects: i64,
    pub active_projects: i64,
    pub completed_projects: i64,
    pub total_tasks: i64,
    pub completed_tasks: i64,
    pub pending_tasks: i64,
}