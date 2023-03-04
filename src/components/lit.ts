import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

export const tagName = "count-element";

@customElement(tagName)
export default class Count extends LitElement {
    static styles = css`
        div {
            color: coral;
        }
    `;

    declare count: number;

    constructor() {
        super();
        this.count = 0;
    }

    connectedCallback() {
        setInterval(() => {
            ++this.count;
        }, 1000);
    }

    render() {
        return html`<div>Hello world from Lit ${this.count}</div>`;
    }
}

// customElements.define(tagName, Count);
