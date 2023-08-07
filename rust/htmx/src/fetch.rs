use actix_web::{get, HttpRequest, HttpResponse};
use rand::seq::SliceRandom;
use std::env;

fn element(item: String) -> String {
    item
}

#[get("/htmx/rust/fetch")]
pub async fn get(_: HttpRequest) -> HttpResponse {
    let api = env::var("API_URL").unwrap();
    println!("API_URL: {}", api);
    let api = api.trim_end_matches("/");
    println!("API_URL: {}", api);
    let resp = reqwest::get(&format!("{}/api/fetch", api))
        .await
        .unwrap()
        .text()
        .await
        .unwrap();
    println!("Raw resp {}", resp);
    let items = resp
        .trim_start_matches('[')
        .trim_end_matches(']')
        .split(',')
        .map(|s| s.to_string())
        .map(|s| s.trim_start_matches('"').trim_end_matches('"').to_string())
        .collect::<Vec<String>>();
    println!("This");
    let item = items.choose(&mut rand::thread_rng()).unwrap().to_string();
    println!("That");
    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(element(item));
}
