import { defineConfig } from "astro/config";

// https://astro.build/config
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";
import svelte from "@astrojs/svelte";
import alpinejs from "@astrojs/alpinejs";
import lit from "@astrojs/lit";
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
        vue({ jsx: true }),
    ],
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
});
