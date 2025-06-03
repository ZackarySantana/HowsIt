FROM rust:1.71 as build

# RUN addgroup app_group && adduser -u 10000 --group app_group app_user

RUN mkdir /app
WORKDIR /app

COPY . .

RUN cargo build --release

# Final image
# FROM alpine:latest making a statically linked binary we can use alpine but rust makes that extremely hard :(
FROM rust:1.71

RUN mkdir /app
WORKDIR /app

COPY --from=build /app/target/release/rubber /app/rubber
RUN chmod +x ./rubber

# RUN apk update && apk add curl

# COPY --from=build /etc/passwd /etc/passwd
# USER app_user

CMD ["/app/rubber"]