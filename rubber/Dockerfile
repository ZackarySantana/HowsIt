FROM rust:1.71 as build

# RUN addgroup app_group && adduser -u 10000 --group app_group app_user

RUN mkdir /app
WORKDIR /app

COPY . .

RUN cargo build --release

# Final image - using debian-slim for smaller size but glibc compatibility
FROM debian:bookworm-slim

# Install runtime dependencies and curl for health checks
RUN apt-get update && \
    apt-get install -y ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -r app && useradd -r -g app app

RUN mkdir /app && chown app:app /app
WORKDIR /app

COPY --from=build /app/target/release/rubber /app/rubber
RUN chmod +x /app/rubber && chown app:app /app/rubber

USER app

EXPOSE 3001

CMD ["/app/rubber"]
