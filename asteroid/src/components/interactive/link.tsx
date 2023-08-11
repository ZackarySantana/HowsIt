/** @jsxImportSource solid-js */

import type { JSX } from "solid-js/jsx-runtime";

export default function Link(props: {
    href: string;
    class?: string;
    disabled?: boolean;
    children: string | JSX.Element;
}) {
    const isInternal = props.href.startsWith("/") || props.href.startsWith("#");
    const disabled = () =>
        props.disabled ? "cursor-default" : "hover:text-blue-600";
    if (isInternal) {
        return (
            <a
                href={props.href}
                aria-disabled={props.disabled}
                class={`text-blue-400 transition-colors ${disabled()} ${
                    props.class
                }`}
            >
                {props.children}
            </a>
        );
    }

    return (
        <a
            href={props.href}
            aria-disabled={props.disabled}
            class={`text-blue-400 transition-colors ${disabled()} ${
                props.class
            }`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {props.children}
        </a>
    );
}
