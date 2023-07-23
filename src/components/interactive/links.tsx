/** @jsxImportSource solid-js */

import { createSignal, onMount } from "solid-js";
import Tags from "./tags";
import { default as LinkHref } from "./link";

function TagsLink(props: {
    label: string;
    desc: string;
    href: string;
    read: string;
    setRead: (read: boolean) => void;
    tags: string[];
}) {
    return (
        <div class={`my-4 transition-all ${props.read() ? "read-post" : ""}`}>
            <LinkHref
                href={props.href}
                class="text-2xl font-bold"
            >
                {props.label}
            </LinkHref>
            <p>{props.desc}</p>
            <input
                type="checkbox"
                class="mr-2 mt-2"
                checked={props.read()}
                onChange={(e) => {
                    props.setRead(e.currentTarget.checked);
                    if (!e.currentTarget.checked) {
                        localStorage.removeItem(props.href);
                        return;
                    }
                    localStorage.setItem(props.href, e.currentTarget.checked);
                }}
            />
            <Tags
                inline
                tags={props.tags?.map((t) => ({
                    label: t,
                }))}
            />
        </div>
    );
}

function NoTagsLink(props: {
    label: string;
    desc: string;
    href: string;
    read: string;
    setRead: (read: boolean) => void;
}) {
    return (
        <div class={`my-4 transition-all ${props.read() ? "read-post" : ""}`}>
            <LinkHref
                href={props.href}
                class="text-2xl font-bold"
            >
                {props.label}
            </LinkHref>
            <div>
                <input
                    type="checkbox"
                    class="mr-2 mt-2"
                    checked={props.read()}
                    onChange={(e) => {
                        props.setRead(e.currentTarget.checked);
                        if (!e.currentTarget.checked) {
                            localStorage.removeItem(props.href);
                            return;
                        }
                        localStorage.setItem(
                            props.href,
                            e.currentTarget.checked,
                        );
                    }}
                />
                <p class="inline">{props.desc}</p>
            </div>
        </div>
    );
}

function Link(props: {
    label: string;
    desc: string;
    href: string;
    tags?: string[];
}) {
    const [read, setRead] = createSignal(
        typeof localstorage !== "undefined"
            ? localStorage.getItem(props.href)
            : false,
    );

    onMount(() => {
        const read = localStorage.getItem(props.href);
        if (read) {
            setRead(true);
        }
    });

    if (props.tags && props.tags.length !== 0) {
        return (
            <TagsLink
                label={props.label}
                desc={props.desc}
                href={props.href}
                read={read}
                setRead={setRead}
                tags={props.tags}
            />
        );
    }

    return (
        <NoTagsLink
            label={props.label}
            desc={props.desc}
            href={props.href}
            setRead={setRead}
            read={read}
        />
    );
}

export default function Links(props: {
    examples: { label: string; desc: string; href: string; tags?: string[] }[];
    placeholder: string;
}) {
    const [filter, setFilter] = createSignal("");

    const examples = () =>
        props.examples.filter(
            (e) =>
                e.label.toLowerCase().includes(filter()) ||
                e.desc.toLowerCase().includes(filter()) ||
                e.tags?.some((t) => t.toLowerCase().includes(filter())),
        );

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
            {examples().map((e) => (
                <Link
                    label={e.label}
                    desc={e.desc}
                    href={e.href}
                    tags={e.tags}
                />
            ))}
        </>
    );
}
