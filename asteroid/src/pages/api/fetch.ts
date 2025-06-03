import type { APIRoute } from "astro";

const data = [
    "How many bottles of beer on the wall for this trip?",
    "The best way to predict the future is to create it.",
    "The only impossible journey is the one you never begin.",
    "The journey of a thousand miles begins with a single step.",
    "The world is a book and those who do not explore read only one page.",
    "Only those who risk going too far can possibly find out how far they can go.",
    "Wherever you get to is better than where you started. To stay on track is a massive achievement.",
    "I may not have gone where I intended to go, but I think I have ended up where I needed to be.",
    "One small step for man, one giant leap for mankind.",
    "Comfort is the cradle of the mind, but one cannot live in a cradle forever.",
    "The wise only possess ideas; the great are possessed by them.",
    "No matter what people tell you, words and ideas can change the world.",
    "Ideas are easy. It's the execution of ideas that really separates the sheep from the goats.",
];

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json",
        },
    });
};
