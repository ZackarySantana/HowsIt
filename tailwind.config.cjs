/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

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
            animation: {
                disappear: "disappear 1s forwards",
            },
            keyframes: {
                disappear: {
                    from: { opacity: "0.5", height: "auto" },
                    "90%": { height: "auto" },
                    to: { opacity: "0", height: 0 },
                },
            },
        },
    },
    plugins: [
        plugin(function classes({ addUtilities }) {
            addUtilities({
                ".read-post": {
                    opacity: "0.5",
                },
                ".read-post .title": {
                    "text-decoration": "line-through",
                    "font-style": "italic",
                },
            });
        }),
        plugin(function inputs({ addUtilities, theme }) {
            addUtilities({
                ".learn-post h1": {
                    "font-size": theme("fontSize.2xl"),
                    "font-weight": theme("fontWeight.semibold"),
                    "margin-top": theme("spacing.4"),
                    "margin-bottom": theme("spacing.1"),
                },
                ".learn-post h2": {
                    "font-size": theme("fontSize.xl"),
                    "font-weight": theme("fontWeight.semibold"),
                    "margin-top": theme("spacing.4"),
                    "margin-bottom": theme("spacing.1"),
                },
                ".learn-post h3": {
                    "font-size": theme("fontSize.lg"),
                    "font-weight": theme("fontWeight.semibold"),
                    "margin-top": theme("spacing.4"),
                    "margin-bottom": theme("spacing.1"),
                },
                ".learn-post blockquote": {
                    position: "relative",
                    "margin-left": theme("spacing.4"),
                    color: theme("colors.gray.300"),
                    "font-style": "italic",
                    "&::before": {
                        content: "'>'",
                        position: "absolute",
                        top: 0,
                        left: "-" + theme("spacing.4"),
                        color: "white",
                        "font-style": "normal",
                    },
                },
                ".learn-post ul": {
                    "margin-left": theme("spacing.8"),
                    "list-style-type": "decimal",
                },
                // A tag
                ".learn-post a": {
                    color: theme("colors.blue.400"),
                    transition: "color 0.15s ease",
                    "&:hover": {
                        color: theme("colors.blue.600"),
                    },
                },
            });
        }),
    ],
};
