import type { APIRoute } from "astro";

const element = (text: string) => `
    ${text}
`;

export const get: APIRoute = async () => {
    const resp = await fetch("http://localhost:3000/api/fetch");
    const json = await resp.json();
    const items = json as string[];
    const item = items[Math.floor(Math.random() * items.length)];

    return new Response(element(item), {
        headers: {
            "content-type": "text/html",
        },
    });
};
