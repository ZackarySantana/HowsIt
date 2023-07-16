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
    -   [React](https://reactjs.org/)
    -   [Preact](https://preactjs.com/)
    -   [Svelte](https://svelte.dev/)
    -   [Solid](https://www.solidjs.com/)
    -   [Lit](https://lit.dev/)
    -   [Alpine](https://alpinejs.dev/)

### Backend:

-   [Astro](https://astro.build/) - Main Framework

### Deployment

-   [Docker](https://www.docker.com/) - To make stable and reliable VM's for deployment
-   [Flyctl](https://fly.io/docs) - Deployment software that hosts website
-   [YAML](https://yaml.org/) - Formatting of the configuration for deployment

## Development

-   Git clone this repository.
-   Run `npm install` in the root directory with this project's package.json.
-   Run `npm run dev` to start the project.

## Deployment Web

```bash
flyctl deploy
```

Or

```bash
fly deploy
```
