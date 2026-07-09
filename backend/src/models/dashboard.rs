use serde::Serialize;

#[derive(Serialize)]
pub struct DashboardStats {
    pub total_projects: i64,
    pub total_tasks: i64,
    pub completed_tasks: i64,
    pub pending_tasks: i64,
    pub total_team_members: i64,
}