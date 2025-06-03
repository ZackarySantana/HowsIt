import type { APIRoute } from "astro";

const element = (interval: number) => `
    ${interval}
    <input 
        type="hidden"
        name="intervalTypeScript"
        value="${interval}"
    />
`;

function parseNumber(value: string | undefined): number {
    const i = Number(value);
    return isNaN(i) ? 0 : i;
}

export const GET: APIRoute = async () => {
    return new Response(element(0), {
        headers: {
            "content-type": "text/html",
        },
    });
};

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const interval = parseNumber(
        formData.get("intervalTypeScript")?.toString(),
    );

    return new Response(element(interval + 1), {
        headers: {
            "content-type": "text/html",
        },
    });
};
