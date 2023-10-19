export const libraries = {
    vanilla: {
        name: "Vanilla",
        url: "vanilla",
        docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        extension: "html",
        supportedLanguages: ["JavaScript"],
        notes: [
            "Vanilla JS is writing raw JavaScript that the browser will get without any compile steps.",
            "It is the simpliest in that you only use fundamentals but it doesn't scale to large web applications as easily.",
        ],
    },
    react: {
        name: "React",
        url: "react",
        docs: "https://react.dev",
        extension: "tsx",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: [
            "React is the most popular library/framework. It focuses on making reusable components (which are functions that export JSX). It follows a functional-programming paradigm (FP) which means it uses pure functions and immutable data.",
            "It uses JSX (JavaScript XML) which is a syntax extension in JS/TS that allows you to write HTML-like code as components in your code.",
            "A virtual DOM is used to update the DOM when data changes. This means changes to the data edit this virtual DOM and if there is a difference between the virtual DOM and the real DOM, React updates it",
            "React is establishing more and more features that make it more of a framework than a library. Usually a library can be used in combination with other tools, and isn't as opinionated as a framework.",
            "Next.js and Remix.js are two popular frameworks that use React.",
        ],
    },
    solid: {
        name: "Solid",
        url: "solid",
        docs: "https://www.solidjs.com/docs/latest",
        extension: "tsx",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: [
            "Solid is a new library that uses JSX and focuses on reusable components like React. It does not follow a functional programming paradigm. It also does not use a virtual DOM.",
            "It's core concept is signals, which are values that run special code when they change. This special code means if you reassign a variable to a new reference, it will update everywhere the signal is used. If you come from a RxJS background, this is similar to observables with less overhead.",
            "It focuses on performance, simplicity, and size. It's a direct alternative to React but you trade-off popular frameworks like Next.js.",
        ],
    },
    preact: {
        name: "Preact",
        url: "preact",
        docs: "https://preactjs.com/guide/v10/getting-started",
        extension: "tsx",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: [
            "Preact is a drop-in replacement for React. It's smaller and does almost everything React does. The only reason to use Preact is if you want to reduce your bundle size (how much code is being sent to the browser).",
            "Everything that works in React will work in Preact with a preact-compat package. The only exception is major frameworks that don't support it.",
            "It has extended React to support signals as well. Preact signals are similar to Solid signals in effect but their syntax is slightly different.",
        ],
    },
    svelte: {
        name: "Svelte",
        url: "svelte",
        docs: "https://svelte.dev/docs",
        extension: "svelte",
        supportedLanguages: ["JSDoc", "JavaScript"],
        notes: [
            "Svelte (with SvelteKit) is a framework that uses single-file components (SFCs). It's great for beginners because of it's relatively simple and understable code.",
            "It doesn't use a virtual DOM (view React or Vue to compare), it instead compiles it down to JavaScript and updates the DOM directly.",
            "JSDoc is now used to annotate types for variables, functions, parameters, return values, etc instead of a typed language like TypeScript. Many believe this can speed up development time but may be easier to introduce bugs.",
        ],
    },
    vue: {
        name: "Vue",
        url: "vue",
        docs: "https://v3.vuejs.org/guide/introduction.html",
        extension: "vue",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: [
            "Vue is a framework that uses single-file components (SFCs). It tends to be easier to beginners to learn than React.",
            "A virtual DOM is used to update the DOM when data changes. This means changes to the data edit this virtual DOM and if there is a difference between the virtual DOM and the real DOM, Vue updates it",
            "Model View ViewModel (MVVM) is the architecture that Vue uses, which is a two way data binding architecture.",
            "It historically has been more of a single-page app (SPA) framework than an MPA framework, but it's still possible to build MPAs with it.",
        ],
    },
    htmx: {
        name: "htmx",
        url: "htmx",
        docs: "https://htmx.org",
        extension: "html",
        supportedLanguages: ["HTML"],
        notes: [
            "HTMX makes all logic, rendering, and state handled server side only. It adds additional markup to HTML to allow it to send GET, POST, PUT, and DELETE requests that replace a DOM element with a response by the given endpoint.",
            "This means all logic is controlled by the backend. You can also set cookies and increase the complexity of the requests.",
            "It supports different triggers, triggers on an interval, and OOB swaps (out of bands, or DOM elements that aren't related to the DOM you are replacing).",
        ],
    },
    alpinejs: {
        name: "Alpine.js",
        url: "alpinejs",
        docs: "https://alpinejs.dev",
        extension: "html",
        supportedLanguages: ["HTML"],
        notes: ["TBA"],
    },
    astro: {
        name: "Astro",
        url: "astro",
        docs: "https://docs.astro.build/",
        extension: "astro",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: [
            "Astro is a meta-framework that focuses on shipping less JavaScript and having a modular way of using your favorite libraries.",
            "You can build your app using many of it's different integrations, which is how this site was built using all the different libraries!",
            "As of right now (they have plans to change this), Astro is only a multi-page application (MPA), meaning it doesn't support client-side routing. Read more about these rendering styles in the learn section of the site!",
        ],
    },
    lit: {
        name: "Lit",
        url: "lit",
        docs: "https://lit.dev",
        extension: "ts",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: ["TBA"],
    },
} as const;

export const librariesTBA = {
    angular: {
        name: "Angular",
        docs: "https://angular.io/docs",
        url: "angular",
        extension: "ts",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: [],
    },
    qwik: {
        name: "Qwik",
        docs: "https://docs.qwik.dev",
        url: "qwik",
        extension: "ts",
        supportedLanguages: [],
        notes: [],
    },
    webcomponents: {
        name: "Web Components",
        docs: "https://developer.mozilla.org/en-US/docs/Web/Web_Components",
        url: "web-components",
        extension: "ts",
        supportedLanguages: [],
        notes: [],
    },
} as const;

export type Library = (typeof libraries)[keyof typeof libraries];
export type LibraryName = keyof typeof libraries;
export type TBALibraryName = keyof typeof librariesTBA;

export function IsLibrary(library: string): library is LibraryName {
    return library in libraries;
}

export function IsTBALibrary(library: string): library is TBALibraryName {
    return library in librariesTBA;
}

export function GetLibrary(library: string): Library | null {
    if (IsLibrary(library)) {
        return libraries[library];
    }
    return null;
}
