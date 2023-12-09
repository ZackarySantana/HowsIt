import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";
import lit from "@astrojs/lit";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

//  Preact({
//       Include: ['**/preact/*'],
//     }),
//     React({
//       Include: ['**/react/*'],
//     }),
//     Solid({
//       Include: ['**/solid/*'],
//     }),

// https://astro.build/config
export default defineConfig({
    integrations: [
        preact({ include: ["**/preact/*"] }),
        react({ include: ["**/react/*"] }),
        tailwind(),
        solidJs({ include: ["**/solid/*", "**/interactive/*"] }),
        svelte({ include: ["**/svelte/*"] }),
        alpinejs({ include: ["**/alpine/*"] }),
        lit({ include: ["**/lit/*"] }),
        vue({
            jsx: true,
            // Include: ["**/vue/*"],
        }),
        mdx(),
    ],
    prefetch: {
        prefetchAll: true,
    },
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    vite: {
        server: {
            proxy: {
                "/htmx/rust": {
                    target: "http://localhost:3001",
                    changeOrigin: true,
                    // Rewrite: (path) => path.replace("/htmx/rust", ""),
                },
                "/htmx/go": {
                    target: "http://localhost:3002",
                    changeOrigin: true,
                    // Rewrite: (path) => path.replace("/htmx/go", ""),
                },
            },
        },
    },
});
