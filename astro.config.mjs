import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";
import lit from "@astrojs/lit";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    integrations: [
        preact(),
        react(),
        tailwind(),
        prefetch({
            selector: "a",
        }),
        solidJs(),
        svelte(),
        alpinejs(),
        lit(),
        vue({
            jsx: true,
        }),
        mdx(),
    ],
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
            },
        },
    },
});
