mod routes;
mod models;
mod database;
mod utils;
mod middleware;

use axum::{
    Router,
    routing::{post, put},
};

use routes::auth::{
    register,
    login,
    profile,
};

use routes::project::{
    create_project,
    get_projects,
};

use routes::task::{
    create_task,
    get_tasks,
    update_task,
    delete_task,
};
use routes::milestone::{
    create_milestone,
    get_milestones,
    update_milestone,
    delete_milestone,
};
use routes::team_member::{
    create_team_member,
    get_team_members,
    update_team_member,
    delete_team_member,
};

#[tokio::main]
async fn main() {

    dotenvy::dotenv().ok();

    let app = Router::new()
    .route("/register", post(register))
    .route("/login", post(login))
    .route("/profile", axum::routing::get(profile))
    .route("/projects", post(create_project))
    .route("/projects", axum::routing::get(get_projects))
    .route("/tasks", post(create_task))
    .route("/tasks", axum::routing::get(get_tasks))
    .route("/tasks/{id}", axum::routing::put(update_task))
    .route("/tasks/{id}", axum::routing::delete(delete_task))
    .route("/milestones", post(create_milestone))
    .route("/milestones", axum::routing::get(get_milestones))
    .route("/milestones/{id}", axum::routing::put(update_milestone))
    .route("/milestones/{id}", axum::routing::delete(delete_milestone))
    .route("/users", post(create_team_member))
    .route("/users", axum::routing::get(get_team_members))
    .route("/users/{id}", axum::routing::put(update_team_member))
    .route("/users/{id}", axum::routing::delete(delete_team_member));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080")
        .await
        .unwrap();

    println!("Server running on port 8080");

    axum::serve(listener, app)
        .await
        .unwrap();
}