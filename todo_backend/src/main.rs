use actix_cors::Cors;
use actix_web::{App, HttpResponse, HttpServer, Responder, web};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Task {
    id: String,
    title: String,
    completed: bool,
    created_at: String,
}

struct AppState {
    tasks: Mutex<Vec<Task>>,
}

#[derive(Deserialize)]
struct CreateTaskRequest {
    title: String,
}

#[derive(Deserialize)]
struct UpdateTaskRequest {
    title: Option<String>,
    completed: Option<bool>,
}

async fn index() -> impl Responder {
    HttpResponse::Ok().body("seja bem-vindo ao servidor de tarefas")
}

async fn get_tasks(data: web::Data<AppState>) -> impl Responder {
    let tasks = data.tasks.lock().unwrap();
    HttpResponse::Ok().json(tasks.clone())
}

async fn create_task(
    data: web::Data<AppState>,
    task_req: web::Json<CreateTaskRequest>,
) -> impl Responder {
    let mut tasks = data.tasks.lock().unwrap();
    let new_task = Task {
        id: Uuid::new_v4().to_string(),
        title: task_req.title.clone(),
        completed: false,
        created_at: Utc::now().to_rfc3339(),
    };
    tasks.push(new_task.clone());
    HttpResponse::Created().json(new_task)
}

async fn update_task(
    data: web::Data<AppState>,
    task_id: web::Path<String>,
    task_req: web::Json<UpdateTaskRequest>,
) -> impl Responder {
    let mut tasks = data.tasks.lock().unwrap();
    if let Some(task) = tasks.iter_mut().find(|t| t.id == *task_id) {
        if let Some(title) = &task_req.title {
            task.title = title.clone();
        }
        if let Some(completed) = task_req.completed {
            task.completed = completed;
        }
        HttpResponse::Ok().json(task.clone())
    } else {
        HttpResponse::NotFound().body("tarefa não encontrada")
    }
}

async fn delete_task(data: web::Data<AppState>, task_id: web::Path<String>) -> impl Responder {
    let mut tasks = data.tasks.lock().unwrap();
    let initial_len = tasks.len();
    tasks.retain(|t| t.id != *task_id);
    if tasks.len() < initial_len {
        HttpResponse::Ok().json(serde_json::json!({ "message": "tarefa removida com sucesso" }))
    } else {
        HttpResponse::NotFound().body("tarefa não encontrada")
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let app_state = web::Data::new(AppState {
        tasks: Mutex::new(vec![]),
    });
    println!("URL do servidor: http://localhost:3030");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();
        App::new()
            .wrap(cors)
            .app_data(app_state.clone())
            .route("/", web::get().to(index))
            .route("/tasks", web::get().to(get_tasks))
            .route("/tasks", web::post().to(create_task))
            .route("/tasks/{id}", web::put().to(update_task))
            .route("/tasks/{id}", web::delete().to(delete_task))
    })
    .bind("127.0.0.1:3030")?
    .run()
    .await
}
