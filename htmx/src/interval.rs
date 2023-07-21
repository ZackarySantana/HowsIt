use actix_web::{get, post, web, HttpRequest, HttpResponse};
use leptos::*;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct IntervalForm {
    interval_rust: String,
}

fn element(index: i32) -> String {
    leptos::ssr::render_to_string(move |cx| {
        view! { cx,
            {index}
            <input
                type="hidden"
                name="interval_rust"
                value="{index}"
            />
        }
    })
}

#[get("/interval")]
pub async fn get(_: HttpRequest) -> HttpResponse {
    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(element(0));
}

#[post("/interval")]
pub async fn post(_req: HttpRequest, info: web::Form<IntervalForm>) -> HttpResponse {
    let counter = info.interval_rust.parse::<i32>().unwrap();

    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(element(counter + 1));
}
