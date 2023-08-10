import { defineCollection, reference, z } from "astro:content";

const learn = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: reference("authors"),
        tags: z.array(z.string()).optional(),
        relatedPosts: z.array(reference("learn")).optional(),
    }),
});

const authors = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        bio: z.string(),
        portfolio: z.string().url(),
    }),
});

export const collections = {
    learn,
    authors,
};
