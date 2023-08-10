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

CMD ["npm", "run", "deploy"]