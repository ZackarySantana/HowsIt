/** @jsxImportSource solid-js */

import { For, createEffect, createSignal } from "solid-js";
import { default as LinkHref } from "./link";
import Tags from "./tags";
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
    const blurClasses = () => (props.blur ? "blur-sm select-none" : "blur-0");
    const markedReadClasses = () => (props.example.read ? "read-post" : "");
    return (
        <section
            class={`my-2 !py-5 transition-all ${blurClasses()} ${markedReadClasses()}`}
        >
            <LinkHref
                href={props.example.href}
                class="text-2xl font-bold title"
                disabled={props.blur}
            >
                {props.example.label}
            </LinkHref>
            <p>{props.example.desc}</p>
            <input
                type="checkbox"
                class="mr-2 mt-2 cursor-pointer"
                disabled={props.blur}
                checked={props.example.read}
                onChange={(e) => {
                    const c = e.currentTarget.checked;
                    if (!c) {
                        localStorage.removeItem(props.example.href);
                    } else {
                        localStorage.setItem(props.example.href, c + "");
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
        </section>
    );
}

function NoTagsLink(props: {
    example: Example;
    recompute: () => void;
    blur: boolean;
}) {
    const blurClasses = () => (props.blur ? "blur-sm select-none" : "");
    const markedReadClasses = () => (props.example.read ? "read-post" : "");
    return (
        <div
            class={`my-4 transition-all ${blurClasses()} ${markedReadClasses()}`}
        >
            <LinkHref
                href={props.example.href}
                class="text-2xl font-bold title"
                disabled={props.blur}
            >
                {props.example.label}
            </LinkHref>
            <div>
                <input
                    type="checkbox"
                    class="mr-2 mt-2 cursor-pointer"
                    disabled={props.blur}
                    checked={props.example.read}
                    onChange={(e) => {
                        const c = e.currentTarget.checked;
                        if (!c) {
                            localStorage.removeItem(props.example.href);
                        } else {
                            localStorage.setItem(props.example.href, c + "");
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
    if (props.example.tags && props.example.tags.length !== 0) {
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

function searchExamples(examples: Example[], filter: string) {
    return examples.filter(
        (e) =>
            e.label.toLowerCase().includes(filter) ||
            e.desc.toLowerCase().includes(filter) ||
            e.tags?.some((t) => t.toLowerCase().includes(filter)),
    );
}

function filterExamples(examples: Example[], filter: string[]) {
    if (filter.length === 0) {
        return examples;
    }
    return examples.filter((e) => {
        if (!e.tags) {
            return false;
        }
        return filter.some((f) => e.tags?.includes(f));
    });
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

function SearchLabel() {
    return (
        <label
            for="search"
            class="text-2xl font-semibold"
        >
            Search
        </label>
    );
}

function FilterLabel() {
    return (
        <label
            for="filter"
            class="mt-2 block text-2xl font-semibold"
        >
            Filter
        </label>
    );
}

function Tag(props: { label: string; onClick: () => void; active: boolean }) {
    return (
        <button
            class={`${
                props.active
                    ? "bg-secondary-background hover:drop-shadow-[0_0_3px_rgba(0,0,0,0.8)]"
                    : "bg-primary-background drop-shadow-[0_0_3px_rgba(0,0,0,0.8)] hover:bg-thirdary-background"
            } rounded-md px-2 py-1 text-gray-100 transition-all`}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
}

// eslint-disable-next-line max-lines-per-function
export default function Links(props: {
    examples: Omit<Example, "read">[];
    placeholder: string;
    tags: string[];
}) {
    const [filter, setFilter] = createSignal("");
    const [tagFilter, setTagFilter] = createSignal<string[]>([]);
    const [recompute, setRecompute] = createSignal(false);
    const [examples, setExamples] = createSignal(
        props.examples.map((e) => ({ ...e, read: false })),
    );
    const [showFallback] = useShowFallback();

    createEffect(() => {
        if (showFallback()) {
            return;
        }
        setExamples(
            sortByRead(
                filterExamples(
                    searchExamples(
                        markedRead(
                            props.examples.map((e) => ({ ...e, read: false })),
                        ),
                        filter(),
                    ),
                    tagFilter(),
                ),
            ),
        );
        recompute();
    });

    return (
        <>
            <section class="mb-2 mt-6 !py-5">
                <SearchLabel />
                <input
                    id="search"
                    type="text"
                    placeholder={props.placeholder}
                    class="mt-2 block w-full rounded-md border border-slate-950 bg-secondary-background px-4 py-2 text-gray-100 outline-none focus:border-slate-400 sm:w-[50%]"
                    onInput={(e) =>
                        setFilter(e.currentTarget.value.toLowerCase())
                    }
                />
                <FilterLabel />
                <div class="mt-2 flex flex-wrap gap-2">
                    <For each={props.tags}>
                        {(t) => (
                            <Tag
                                label={t}
                                onClick={() => {
                                    if (tagFilter().includes(t)) {
                                        setTagFilter(
                                            tagFilter().filter(
                                                (tt) => tt !== t,
                                            ),
                                        );
                                    } else {
                                        setTagFilter([...tagFilter(), t]);
                                    }
                                }}
                                active={tagFilter().includes(t)}
                            />
                        )}
                    </For>
                </div>
            </section>
            <For each={examples()}>
                {(e) => (
                    <Link
                        example={e}
                        recompute={() => setRecompute(!recompute())}
                        blur={showFallback()}
                    />
                )}
            </For>
        </>
    );
}
