mod routes;
mod models;
mod database;
mod utils;
mod middleware;
use tower_http::cors::{CorsLayer, Any};
use axum::http::{
    Method,
    header,
};

use axum::{
    Router,
    routing::{post, put},
};

use routes::auth::{
    register,
    login,
    profile,
    change_password,
    reset_password,
    send_otp,
    verify_otp,

};

use routes::project::{
    create_project,
    get_projects,
    delete_project,
};

use routes::task::{
    create_task,
    get_tasks,
    update_task,
    delete_task,
    get_employee_tasks,
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
use routes::dashboard::get_dashboard;
use routes::role::{
    check_role,
    admin_only,
};
use routes::activity_log::get_logs;
use routes::analytics::get_analytics;

#[tokio::main]
async fn main() {

    dotenvy::dotenv().ok();

    let cors = CorsLayer::new()
        .allow_origin(
            "http://localhost:5173"
                .parse::<axum::http::HeaderValue>()
                .unwrap()
        )
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
        ]);
    let cors = CorsLayer::new()
    .allow_origin(Any)
    .allow_methods([
        Method::GET,
        Method::POST,
        Method::PUT,
        Method::DELETE,
    ])
    .allow_headers([
        header::CONTENT_TYPE,
        header::AUTHORIZATION,
    ]);

    let app = Router::new()
    .route("/register", post(register))
    .route("/login", post(login))
    .route("/reset-password", post(reset_password))
    .route("/send-otp", post(send_otp))
    .route("/verify-otp", post(verify_otp))
    .route("/profile", post(profile))
    .route("/change-password", post(change_password))
    .route("/projects", post(create_project))
    .route("/projects", axum::routing::get(get_projects))
    .route("/projects/{id}", axum::routing::delete(delete_project))
    .route("/tasks", post(create_task))
    .route("/tasks", axum::routing::get(get_tasks))
    .route("/tasks/{id}", axum::routing::put(update_task))
    .route("/tasks/{id}", axum::routing::delete(delete_task))
    .route("/employee-tasks/{id}", axum::routing::get(get_employee_tasks))
    .route("/milestones", post(create_milestone))
    .route("/milestones", axum::routing::get(get_milestones))
    .route("/milestones/{id}", axum::routing::put(update_milestone))
    .route("/milestones/{id}", axum::routing::delete(delete_milestone))
    .route("/users", post(create_team_member))
    .route("/users", axum::routing::get(get_team_members))
    .route("/users/{id}", axum::routing::put(update_team_member))
    .route("/users/{id}", axum::routing::delete(delete_team_member))
    .route("/dashboard", axum::routing::get(get_dashboard))
    .route("/check-role", post(check_role))
    .route("/admin", post(admin_only))
    .route("/logs", axum::routing::get(get_logs))
    .route("/analytics", axum::routing::get(get_analytics))
    .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080")
        .await
        .unwrap();

    println!("Server running on port 8080");

    axum::serve(listener, app)
        .await
        .unwrap();
}