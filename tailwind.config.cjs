/* eslint-disable max-lines-per-function */
/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                "primary-background": "#313131",
                "secondary-background": "#1e1e1e",
                "primary-text": "#ffffde",
                "secondary-text": "#e0e0e0",
                "link-text": "#ff8f00",
                "link-visited": "#8e32dc",
                "metadata-text": "#8a8a8a",
                html: "#f16524",
                css: "#2965f1",
                js: "#f0db4f",
                ts: "#007acc",
                jsdoc: "#006cb7",
            },
            width: {
                main: "90%",
                semimain: "60%",
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
        plugin(function classes({ addUtilities, theme }) {
            const flexAlignCenter = {
                display: "flex",
                "flex-direction": "column",
                "align-items": "center",
                "justify-content": "center",
            };
            addUtilities({
                ":not(.learn-post)": {
                    body: {
                        color: theme("colors.primary-text"),
                        "background-color": theme(
                            "colors.secondary-background",
                        ),
                        "max-width": "100vw",
                        ...flexAlignCenter,
                    },
                    "h1, h2, h3": {
                        color: theme("colors.secondary-text"),
                    },
                    h1: {
                        "font-size": "2rem",
                    },
                    h2: {
                        "font-size": "1.5rem",
                    },
                    h3: {
                        "font-size": "1.25rem",
                    },
                    hr: {
                        "border-top": `1px solid ${theme(
                            "colors.secondary-text",
                        )} `,
                        "margin-block": theme("spacing.3"),
                    },
                    a: {
                        color: theme("colors.link-text"),
                    },
                    "a.active": {
                        color: theme("colors.primary-text"),
                        "font-weight": "bold",
                        "text-decoration": "underline",
                    },
                    "a.has-visited:visited": {
                        color: theme("colors.link-visited"),
                        "font-style": "italic",
                    },
                    "main, section, .section": {
                        "background-color": theme("colors.primary-background"),
                        "padding-block": theme("spacing.10"),
                        "padding-inline": theme("spacing.5"),
                        "border-radius": theme("borderRadius.2xl"),
                        "max-width": theme("width.main"),
                        width: theme("width.main"),
                        "@media (min-width: 1024px)": {
                            "padding-inline": theme("spacing.10"),
                            "max-width": theme("width.semimain"),
                            width: theme("width.semimain"),
                        },
                    },
                    time: {
                        color: theme("colors.metadata-text"),
                        "font-style": "italic",
                    },
                    "article h1:first-child": {
                        "margin-block": theme("spacing.2"),
                    },
                },
            });
        }),
    ],
};
