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
    .route("/tasks/{id}", axum::routing::delete(delete_task));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080")
        .await
        .unwrap();

    println!("Server running on port 8080");

    axum::serve(listener, app)
        .await
        .unwrap();
}