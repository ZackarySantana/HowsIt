use actix_web::{get, post, web, HttpRequest, HttpResponse};
use leptos::*;
use qstring::QString;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct CounterForm {
    counter_rust: String,
}

fn get_delta(query: QString) -> i32 {
    if query.has("increment") {
        return 1;
    }
    if query.has("decrement") {
        return -1;
    }
    return 0;
}

fn element(index: i32) -> String {
    leptos::ssr::render_to_string(move |cx| {
        view! { cx,
            index
            <input
                type="hidden"
                name="counter_rust"
                value=index
            />
        }
    })
}

#[get("/htmx/rust/counter")]
pub async fn get(_: HttpRequest) -> HttpResponse {
    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(element(0));
}

#[post("/htmx/rust/counter")]
pub async fn post(req: HttpRequest, info: web::Form<CounterForm>) -> HttpResponse {
    let counter = info.counter_rust.parse::<i32>().unwrap();
    let delta = get_delta(QString::from(req.query_string()));

    return HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(element(counter + delta));
}
