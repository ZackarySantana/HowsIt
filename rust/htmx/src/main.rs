use actix_web::{middleware, App, HttpServer};
use log::info;
mod counter;
mod interval;
mod todo;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    info!("starting http server at http://[::]:3001");

    let addr = "[::]:3001".parse::<std::net::SocketAddr>().unwrap();

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .service(counter::post)
            .service(counter::get)
            .service(interval::post)
            .service(interval::get)
            .service(todo::get)
            .service(todo::post)
            .service(todo::delete)
    })
    .bind(addr)?
    .run()
    .await
}

// #[tokio::main]
// async fn main() {
//     env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

//     let app = Router::new().route("/counter", get(counter::index));

//     let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
//     axum::serve(listener, app).await.unwrap();
// }
