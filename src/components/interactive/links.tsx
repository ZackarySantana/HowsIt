/** @jsxImportSource solid-js */

import { For, createSignal, createEffect } from "solid-js";
import Tags from "./tags";
import { default as LinkHref } from "./link";
import useShowFallback from "./useShowFallback";

type Example = {
    label: string;
    desc: string;
    href: string;
    tags?: string[];
    read: boolean;
};

function TagsLink(props: {
    example: Example;
    recompute: () => void;
    blur: boolean;
}) {
    const blurClasses = () => (props.blur ? "blur-sm" : "");
    const markedReadClasses = () => (props.example.read ? "read-post" : "");
    return (
        <div
            class={`my-4 transition-all ${blurClasses()} ${markedReadClasses()}`}
        >
            <LinkHref
                href={props.example.href}
                class="text-2xl font-bold title"
            >
                {props.example.label}
            </LinkHref>
            <p>{props.example.desc}</p>
            <input
                type="checkbox"
                class="mr-2 mt-2"
                checked={props.example.read}
                onChange={(e) => {
                    const c = e.currentTarget.checked;
                    if (!c) {
                        localStorage.removeItem(props.example.href);
                    } else {
                        localStorage.setItem(props.example.href, c);
                    }
                    props.recompute();
                }}
            />
            <Tags
                inline
                tags={props.example.tags?.map((t) => ({
                    label: t,
                }))}
            />
        </div>
    );
}

function NoTagsLink(props: {
    example: Example;
    recompute: () => void;
    blur: boolean;
}) {
    const blurClasses = () => (props.blur ? "blur-sm" : "");
    const markedReadClasses = () => (props.example.read ? "read-post" : "");
    return (
        <div
            class={`my-4 transition-all ${blurClasses()} ${markedReadClasses()}`}
        >
            <LinkHref
                href={props.example.href}
                class="text-2xl font-bold title"
            >
                {props.example.label}
            </LinkHref>
            <div>
                <input
                    type="checkbox"
                    class="mr-2 mt-2"
                    checked={props.example.read}
                    onChange={(e) => {
                        const c = e.currentTarget.checked;
                        if (!c) {
                            localStorage.removeItem(props.example.href);
                        } else {
                            localStorage.setItem(props.example.href, c);
                        }
                        props.recompute();
                    }}
                />
                <p class="inline">{props.example.desc}</p>
            </div>
        </div>
    );
}

function Link(props: {
    example: Example;
    blur: boolean;
    recompute: () => void;
}) {
    if (props.tags && props.tags.length !== 0) {
        return (
            <TagsLink
                example={props.example}
                recompute={props.recompute}
                blur={props.blur}
            />
        );
    }

    return (
        <NoTagsLink
            example={props.example}
            recompute={props.recompute}
            blur={props.blur}
        />
    );
}

function filterExamples(examples: Omit<Example, "read">[], filter: string) {
    return examples.filter(
        (e) =>
            e.label.toLowerCase().includes(filter) ||
            e.desc.toLowerCase().includes(filter) ||
            e.tags?.some((t) => t.toLowerCase().includes(filter)),
    );
}

function markedRead(examples: Omit<Example, "read">[]) {
    if (typeof localStorage === "undefined") {
        return examples.map((e) => ({
            ...e,
            read: false,
        }));
    }
    return examples.map((e) => ({
        ...e,
        read: localStorage.getItem(e.href) === "true",
    }));
}

function sortByRead(examples: Example[]) {
    return [...examples].sort((a, b) => {
        if (a.read && !b.read) {
            return 1;
        }
        if (!a.read && b.read) {
            return -1;
        }
        return 0;
    });
}

export default function Links(props: {
    examples: Omit<Example, "read">[];
    placeholder: string;
}) {
    const [filter, setFilter] = createSignal("");
    const [recompute, setRecompute] = createSignal(false);
    const [examples, setExamples] = createSignal(props.examples);
    const [showFallback] = useShowFallback();

    createEffect(() => {
        setExamples(
            sortByRead(filterExamples(markedRead(props.examples), filter())),
        );
        recompute();
    });

    return (
        <>
            <div class="mt-8">
                <label
                    for="search"
                    class="text-2xl font-semibold"
                >
                    Search
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder={props.placeholder}
                    class="mt-2 block w-full rounded-md border border-slate-950 bg-slate-800 px-4 py-2 text-gray-100 outline-none focus:border-slate-400 sm:w-[50%]"
                    onInput={(e) =>
                        setFilter(e.currentTarget.value.toLowerCase())
                    }
                />
            </div>
            <For each={examples()}>
                {(e) => (
                    <Link
                        example={e}
                        recompute={() => setRecompute(!recompute())}
                        examples={examples()}
                        blur={showFallback()}
                    />
                )}
            </For>
        </>
    );
}
