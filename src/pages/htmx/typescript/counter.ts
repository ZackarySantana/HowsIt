import type { APIRoute } from "astro";

const element = (counter: number) => `
    ${counter}
    <input 
        type="hidden"
        name="counter"
        value="${counter}"
    />
`;

function parseNumber(value: string | undefined): number {
    const i = Number(value);
    return isNaN(i) ? 0 : i;
}

export const get: APIRoute = async () => {
    return new Response(element(0), {
        headers: {
            "content-type": "text/html",
        },
    });
};

export const post: APIRoute = async ({ request, url }) => {
    const formData = await request.formData();

    const decrement = url.searchParams.get("decrement") !== null;
    const increment = url.searchParams.get("increment") !== null;

    let counter = parseNumber(formData.get("counter")?.toString());

    if (decrement) {
        --counter;
    }
    if (increment) {
        ++counter;
    }

    return new Response(element(counter), {
        headers: {
            "content-type": "text/html",
        },
    });
};
