# Base node image
FROM node:19-bullseye-slim as base

RUN mkdir /app
WORKDIR /app

# Create deps image that is just the dependancies installed
FROM base as deps

COPY package.json package-lock.json ./
RUN npm install --production=false

# Build the app (minifying too)
FROM deps as build

COPY astro.config.mjs svelte.config.js tailwind.config.cjs tsconfig.json ./
COPY plugins plugins
COPY public public
COPY src src
COPY rust/htmx rust/htmx
RUN npm run build

RUN sed -i "s|parsePathname(pathname, host, port);|pathname;|g" /app/dist/server/entry.mjs 

# Only the production dependancies
FROM deps as production-deps

ENV NODE_ENV=production
RUN npm prune --production

# Starts with the production deps, and grabs the application
FROM production-deps as astro-build

# Install latest security
RUN apt-get upgrade

# Built files
COPY --from=build /app/dist /app/dist
COPY --from=build /app/public /app/public

# Build rust binary(s)
FROM rust as rust-build

RUN mkdir /app
WORKDIR /app

COPY rust/htmx htmx

WORKDIR /app/htmx
RUN cargo build --release

# Build go binary(s)
FROM golang as go-build

RUN mkdir /app
WORKDIR /app

COPY go/htmx htmx

WORKDIR /app/htmx
RUN go build -o htmx

# Final image
FROM astro-build

# Copy the rust binary(s)
COPY --from=rust-build /app/htmx/target/release/htmx /app/rust_htmx 

# Copy the go binary(s)
COPY --from=go-build /app/htmx/htmx /app/go_htmx

RUN apt-get -y update && apt-get -y install nginx
COPY nginx.conf /app/nginx.conf

# CMD ["nginx", "-c", "/app/nginx.conf", "-g", "daemon off;"]
# CMD ["npm", "run", "localdeploy"]