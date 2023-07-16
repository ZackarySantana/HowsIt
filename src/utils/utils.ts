import fs from "fs";

const extensions: { [key: string]: string } = {
    astro: "astro",
    vue: "vue",
    svelte: "svelte",
    lit: "ts",
    alpinejs: "astro",
    react: "tsx",
    preact: "tsx",
    solid: "tsx",
} as const;

const frameworkInfo: { [key: string]: string[] } = {
    astro: [
        "https://astro.build/",
        "Supports TypeScript and JavaScript",
        "Astro is a meta-framework that focuses on shipping less JavaScript and having a modular way of using your favorite libraries.",
        "You can build your app using many of it's different integrations, which is how this site was built using all the different libraries!",
        "As of right now (they have plans to change this), Astro is only a multi-page application (MPA), meaning it doesn't support client-side routing. Read more about these rendering styles in the learn section of the site!",
    ],
    vue: [
        "https://v3.vuejs.org/",
        "Supports TypeScript and JavaScript",
        "Vue is a framework that uses single-file components (SFCs). It tends to be easier to beginners to learn than React.",
        "A virtual DOM is used to update the DOM when data changes. This means changes to the data edit this virtual DOM and if there is a difference between the virtual DOM and the real DOM, Vue updates it",
        "Model View ViewModel (MVVM) is the architecture that Vue uses, which is a two way data binding architecture.",
        "It historically has been more of a single-page app (SPA) framework than an MPA framework, but it's still possible to build MPAs with it.",
    ],
    svelte: [
        "https://svelte.dev/",
        "Supports JavaScript and JS Docs (TypeScript support was recently removed).",
        "Svelte (with SvelteKit) is a framework that uses single-file components (SFCs). It's a newer framework that is great for beginners.",
        "It doesn't use a virtual DOM (view React, Vue to compare), it instead compiles it down to JavaScript and updates the DOM directly.",
    ],
    lit: ["lit"],
    alpinejs: ["alpinejs"],
    react: ["react"],
    preact: ["preact"],
    solid: ["solid"],
};

export function GetExtension(type: string) {
    return extensions[type.toLowerCase()];
}

export function GetVersion(type: string, metaTitle: string) {
    const mt = metaTitle?.toLowerCase() ?? "";

    if (type === "preact") {
        if (mt.includes("hooks")) {
            return "";
        } else if (mt.includes("signals")) {
            return "_2";
        }
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

export function GetTypeInfo(type: string, givenInfo?: string[]): string[] {
    if (givenInfo) {
        return givenInfo;
    }
    return frameworkInfo[type.toLowerCase()] ?? [];
}
