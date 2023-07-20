# Base node image
FROM node:19-bullseye-slim as base

RUN mkdir /app
WORKDIR /app

# Create deps image that is just the dependancies installed
FROM base as deps

COPY package.json package-lock.json ./
RUN npm install --production=false

# Build the app (minifying too)
FROM base as build

COPY --from=deps /app/node_modules /app/node_modules

COPY . .
RUN npm run build

# Only the production dependancies
FROM base as production-deps
ENV NODE_ENV=production

COPY --from=deps /app/package.json /app/package-lock.json ./
COPY --from=deps /app/node_modules /app/node_modules
RUN npm prune --production

# Starts with the production deps, and grabs the application
FROM production-deps as astro-build

# Install latest security
RUN apt-get upgrade

COPY . .

# Built files
COPY --from=build /app/dist /app/dist
COPY --from=build /app/public /app/public

# Build rust binary
FROM rust as rust-build

RUN mkdir /app
WORKDIR /app

COPY htmx .

RUN cargo build --release

# Final image
FROM astro-build

# Copy the rust binary
COPY --from=rust-build /app/target/release/htmx /app/htmx_rust 

CMD ["npm", "run", "deploy"]