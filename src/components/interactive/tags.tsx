/** @jsxImportSource solid-js */

import { For } from "solid-js";

export function Tag(props: { label: string; color?: string }) {
    return (
        <div
            class={`mr-2 mt-2 rounded-md ${
                props.color ?? "bg-slate-700"
            } px-2 py-1 text-sm italic text-gray-300`}
        >
            {props.label}
        </div>
    );
}

export default function Tags(props: {
    tags?: { label: string; color?: string }[];
}) {
    if (!props.tags) {
        return <></>;
    }
    return (
        <div class="flex flex-wrap">
            <For each={props.tags}>
                {(t) => (
                    <Tag
                        label={t.label}
                        color={t.color}
                    />
                )}
            </For>
        </div>
    );
}
