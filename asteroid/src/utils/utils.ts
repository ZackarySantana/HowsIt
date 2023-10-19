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

export function Capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function GroupArrayByValues<T>(arr: T[]): { value: T; count: number }[] {
    const grouping: {
        value: T;
        count: number;
    }[] = [];

    arr.forEach((value) => {
        const group = grouping.find((g) => g.value === value);

        if (group) {
            group.count++;
        } else {
            grouping.push({
                value,
                count: 1,
            });
        }
    });

    return grouping;
}
