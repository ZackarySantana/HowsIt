import { GetLibrary } from "./library";

function getExampleFilePathForHTMX(lang: string, example: string) {
    if (lang.toLowerCase() === "rust") {
        return `rubber/src/${example}.rs`;
    }

    if (lang.toLowerCase() === "go") {
        return `grit/${example}/index.go`;
    }

    return `asteroid/src/pages/htmx/typescript/${example}.ts`;
}

function getExampleFilePath(
    lang: string,
    library: string,
    example: string,
    variant?: string,
) {
    if (library.toLowerCase() === "htmx") {
        return getExampleFilePathForHTMX(lang, example);
    }
    variant = variant ? `_${variant.toLowerCase()}` : "";

    const extension = GetLibrary(library)?.extension;

    return `asteroid/src/examples/${library}/${example}${variant}.${extension}`;
}

function readFileFromGithub(path: string) {
    return fetch(`https://github.com/ZackarySantana/howsit/raw/main/${path}`)
        .then((res) => res.text())
        .catch((e) => {
            console.log(e);
            return "";
        });
}

async function readFileFromLocal(path: string) {
    try {
        const fs = await import("fs");
        const localPath = `../${path}`;
        return fs.readFileSync(localPath, "utf-8");
    } catch (e) {
        console.log(e);
        return "";
    }
}

async function readFile(path: string) {
    if (process.env.NODE_ENV === "production") {
        return readFileFromGithub(path);
    }
    return readFileFromLocal(path);
}

function generateLineNumbers(code: string) {
    const fileLines = code.split("\n");

    const digitLength = (num: number) => Math.floor(Math.log10(num));
    const lineDigits = digitLength(fileLines.length) + 3;
    const getPadding = (i: number) =>
        " ".repeat(lineDigits - digitLength(i + 1));

    return fileLines.map((_, i) => `${i + 1}.${getPadding(i)}`).join("\n");
}

function getHTMXFilePath(lang: string, example: string) {
    return `asteroid/src/examples/htmx/${example}_${lang}.html`;
}

async function getHTMX(lang: string, library: string, example: string) {
    if (library.toLowerCase() !== "htmx") {
        return null;
    }

    const filePath = getHTMXFilePath(lang.toLowerCase(), example.toLowerCase());
    const code = await readFile(filePath);
    const lineNumbers = generateLineNumbers(code);

    return {
        code,
        lineNumbers,
        path: filePath,
    };
}

async function GetScript(
    lang: string,
    library: string,
    example: string,
    variant?: string,
) {
    const filePath = getExampleFilePath(
        lang.toLowerCase(),
        library.toLowerCase(),
        example.toLowerCase(),
        variant?.toLowerCase(),
    );
    const code = await readFile(filePath);
    const lineNumbers = generateLineNumbers(code);

    return {
        code,
        lineNumbers,
        path: filePath,
    };
}

export async function GetCodeInformation(
    lang: string,
    library: string,
    example: string,
    variant?: string,
) {
    const [script, endpoint] = await Promise.all([
        GetScript(lang, library, example, variant),
        getHTMX(lang, library, example),
    ]);
    return {
        script,
        endpoint,
    };
}
