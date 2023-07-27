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
        plugin(function todos({ addUtilities, theme }) {
            addUtilities({
                ".todo-container": {
                    width: "90%",
                    "@media (min-width: 800px)": {
                        width: "50%",
                    },
                    "input, button": {
                        "background-color": theme("colors.gray.400"),
                        color: theme("colors.gray.900"),
                        "padding-inline": theme("spacing.1"),
                        "border-radius": theme("borderRadius.sm"),
                    },
                    "input:hover, button:hover": {
                        "background-color": theme("colors.gray.300"),
                    },
                    "button:active": {
                        "background-color": theme("colors.gray.400"),
                        "box-shadow":
                            "inset 0 0 3px 2px " + theme("colors.gray.500"),
                    },
                },
                ".todo-parent, .todo-header, .todo-item": {
                    display: "flex",
                    gap: theme("spacing.2"),
                },
                ".todo-parent": {
                    "flex-direction": "column",
                },
                ".todo-header, .todo-parent": {
                    width: "100%",
                },
                ".todo-header input": {
                    width: "100%",
                },
                ".todo-header": {
                    "margin-bottom": theme("spacing.4"),
                },
                ".todo-item span": {
                    "word-break": "break-all",
                },
                ".todo-item span + button": {
                    "margin-left": "auto",
                },
                ".todo-completed": {
                    "text-decoration": "line-through",
                    "font-style": "italic",
                },
            });
        }),
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
