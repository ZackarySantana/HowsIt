export type Example = {
    name?: string;
    desc: string;
    shortDesc: string;
    tags: string[];
};

export const examples: {
    [key: string]: Example;
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
        desc: "Async call on each button click to fetch some data from an API. Since this is async, the data will not be fetched when SSR.",
        shortDesc:
            "Async call on each button click to fetch some data from an API.",
        tags: ["Frontend", "Async"],
    },
    // eslint-disable-next-line camelcase
    persistent_fetch: {
        desc: "Async call to fetch some data from an API when mounted, and then it will use the data from the initial call on each future render. Since this is async, the data will not be fetched when SSR.",
        shortDesc: "Async call to fetch some data from an API when mounted.",
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

export const exampleNames = Object.keys(examples);

export const exampleTags = exampleNames
    .map((name) => examples[name].tags)
    .flat();
