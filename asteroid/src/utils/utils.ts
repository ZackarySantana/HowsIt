import fs from "fs";

export const examples: {
    [key: string]: {
        name?: string;
        desc: string;
        shortDesc: string;
        tags: string[];
    };
} = {
    styling: {
        desc: "How custom styling styling can be done in every framework.",
        shortDesc:
            "How to style different components native to each framework.",
        tags: ["Frontend"],
    },
    counter: {
        desc: "Interactive counter with two buttons to increment and decrement the counter. Since this is interactive, the buttons will not work when SSR.",
        shortDesc:
            "Interactive counter with two buttons to increment and decrement the counter.",
        tags: ["Frontend", "Interactive"],
    },
    interval: {
        desc: "Async 1 second interval/timer that increments a number by 1. Since this async, the interval will not start when SSR.",
        shortDesc:
            "Async 1 second interval/timer that increments a number by 1.",
        tags: ["Frontend", "Async"],
    },
    todo: {
        desc: "Interactive todo list that starts with some initial items when created/mounted. Since the initial items are added when created/mounted, they will not display when SSR. As well, the buttons will not work when SSR.",
        shortDesc:
            "Interactive todo list that starts with some initial items when created/mounted.",
        tags: ["Frontend", "Interactive"],
    },
    fetch: {
        desc: "Async call to fetch some data from an API. Since this is async, the data will not be fetched when SSR.",
        shortDesc: "Async call to fetch some data from an API.",
        tags: ["Frontend", "Async"],
    },
    crud: {
        name: "CRUD",
        desc: "Simple CRUD (Create, Read, Update, Delete) API that reads from a JSON file.",
        shortDesc:
            "Simple CRUD (Create, Read, Update, Delete) API that reads from a JSON file.",
        tags: ["Backend", "API"],
    },
};

export type Framework = {
    name: string;
    url: string;
    docs: string;
    extension: string;
    supportedLanguages: string[];
    notes: string[];
};

export const frameworksTBA: {
    [key: string]: Framework;
} = {
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
};

export const frameworks: {
    [key: string]: Framework;
} = {
    vanilla: {
        name: "Vanilla",
        url: "vanilla",
        docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        extension: "html",
        supportedLanguages: ["JavaScript"],
        notes: ["TBA"],
    },
    react: {
        name: "React",
        url: "react",
        docs: "https://react.dev",
        extension: "tsx",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: ["TBA"],
    },
    solid: {
        name: "Solid",
        url: "solid",
        docs: "https://www.solidjs.com/docs/latest",
        extension: "tsx",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: ["TBA"],
    },
    preact: {
        name: "Preact",
        url: "preact",
        docs: "https://preactjs.com/guide/v10/getting-started",
        extension: "tsx",
        supportedLanguages: ["TypeScript", "JavaScript"],
        notes: ["TBA"],
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
        notes: ["TBA"],
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
};

export const images: {
    [key: string]: string;
} = {
    typescript: "/typescript.svg",
    javascript: "/javascript.png",
    vanilla: "/javascript.png",
    jsdoc: "/jsdoc.png",
    html: "/html.svg",
    css: "/css.svg",
    github: "/github.svg",
    react: "/react.svg",
    preact: "/preact.svg",
    svelte: "/svelte.svg",
    solid: "/solid.svg",
    vue: "/vue.svg",
    htmx: "/htmx.png",
    alpinejs: "/alpinejs.svg",
    astro: "/astro.svg",
    lit: "/lit.svg",
};

export function GetExtension(type: string) {
    if (type === "rust") {
        return "rs";
    }
    if (type === "go") {
        return "go";
    }
    if (type === "typescript") {
        return "ts";
    }
    return frameworks[type.toLowerCase()]?.extension;
}

export function GetTypeInfo(type: string, givenInfo?: string[]): string[] {
    if (givenInfo) {
        return givenInfo;
    }
    return frameworks[type.toLowerCase()]?.notes ?? [];
}

function GetPreactVersion(metaTitle?: string) {
    if (!metaTitle) {
        return "";
    }
    return "_" + metaTitle.toLowerCase();
}

function GetHTMXVersion(lang?: string) {
    if (!lang) {
        return "";
    }
    return "_" + lang.toLowerCase();
}

export function GetVersion(type: string, lang?: string, metaTitle?: string) {
    if (type === "preact") {
        const mt = metaTitle?.substring(1, metaTitle.length - 1);
        return GetPreactVersion(mt);
    }

    if (type === "htmx") {
        return GetHTMXVersion(lang);
    }

    return "";
}

export function GetCodeAndLines(path: string) {
    const exists = fs.existsSync(path);
    let code = "Failed to load";
    let lines = "";

    if (exists) {
        code = fs.readFileSync(path, "utf-8");
        const fileLines = code.split("\n");

        const lineDigits = Math.floor(Math.log10(fileLines.length)) + 1;

        const getPadding = (i: number) => {
            return " ".repeat(lineDigits - Math.floor(Math.log10(i + 1)));
        };

        lines = fileLines
            .map((_, i) => `${i + 1}.${getPadding(i)}  `)
            .join("\n");
    }

    return { code, lines };
}

export function GetEndpointCodeAndLines(
    type: string,
    lang: string,
    example: string,
) {
    if (type.toLowerCase() !== "htmx") {
        return undefined;
    }

    let path = `src/pages/htmx/${lang}/${example}.ts`;

    if (lang.toLowerCase() === "rust") {
        path = `../rubber/src/${example}.rs`;
    }

    if (lang.toLowerCase() === "go") {
        path = `../grit/${example}/index.go`;
    }

    return {
        ...GetCodeAndLines(path),
        path,
    };
}

export function GetAllExamples(): string[] {
    return Object.keys(examples);
}

export function Capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function GetAllExampleTags() {
    const tags: string[] = [];

    for (const example of Object.values(examples)) {
        for (const tag of example.tags) {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        }
    }

    return tags;
}
