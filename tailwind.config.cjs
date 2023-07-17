/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                html: "#f16524",
                css: "#2965f1",
                js: "#f0db4f",
                ts: "#007acc",
                jsdoc: "#006cb7",
            },
        },
    },
    plugins: [],
};
