# How's It

[Demo](https://howsit.dev/)

## Contributing

All contributions will be made via the PR tab! Create a branch/fork, code your solution, link the supporting issue that the PR is for, and then make the PR on the GitHub tab.

## Runtime/Tools (Recommended version):

### Required

-   [Node](https://nodejs.org/en/) v19.3.0
-   NPM v9.2.0 (Comes with Node)

### Not required

-   [NVM Windows](https://github.com/coreybutler/nvm-windows) v1.1.9 (Project Management)
-   [NVM Linux](https://github.com/nvm-sh/nvm) v0.39.1 (Project Management)
-   [Docker](https://www.docker.com/) v20.10.16 (Deployment)
-   [Flyctl](https://fly.io/) (Deployment)

## Technologies:

### Frontend:

-   [Astro](https://astro.build/) - Main Framework
-   [TypeScript](https://www.typescriptlang.org/docs/) - Main language
-   Additional:
    -   [Vanilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
    -   [React](https://reactjs.org/)
    -   [Solid](https://www.solidjs.com/)
    -   [Preact Hooks/Signals](https://preactjs.com/)
    -   [Svelte](https://svelte.dev/)
    -   [Vue](https://v3.vuejs.org/)
    -   [htmx](https://htmx.org/)
    -   [Alpine](https://alpinejs.dev/)
    -   [Lit](https://lit.dev/)

### Backend:

-   [Astro](https://astro.build/) - Main Framework
-   [Rust](https://www.rust-lang.org/) - Used in htmx examples

### Deployment

-   [Docker](https://www.docker.com/) - To make stable and reliable VM's for deployment
-   [Flyctl](https://fly.io/docs) - Deployment software that hosts website
-   [YAML](https://yaml.org/) - Formatting of the configuration for deployment
-   [Nginx](https://www.nginx.com/) - Reverse proxy for the deployment

## Development

-   Git clone this repository.
-   Run `npm install` in the root directory with this project's package.json.
-   Run `npm run dev` to start the project.

You can build it locally with

```
sudo docker build -t test .
```

And starting up that docker image.

## Deployment Web

Every time a commit happens on main, deployment will happen automatically. If you need to manually deploy:

```bash
flyctl deploy
```

Or

```bash
fly deploy
```
