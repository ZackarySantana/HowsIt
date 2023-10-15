import { IsSupportedFramework, frameworks } from "./frameworks";

export const extensions = {
    rust: "rs",
    go: "go",
    typescript: "ts",
} as const;

export type Languages = keyof typeof extensions;

export function IsSupportedLanguage(lang: string): lang is Languages {
    return lang in extensions;
}

export function GetLanguageExtension(lang: string): string | null {
    if (IsSupportedLanguage(lang)) {
        return extensions[lang];
    }
    return null;
}

export function GetFrameworkExtension(framework: string): string | null {
    if (IsSupportedFramework(framework)) {
        return frameworks[framework].extension;
    }
    return null;
}
