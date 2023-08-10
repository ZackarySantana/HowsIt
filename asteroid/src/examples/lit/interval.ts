import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
    interface HTMLElementTagNameMap {
        [tagName]: Count;
    }
}

export const tagName = "count-element";

@customElement(tagName)
export default class Count extends LitElement {
    static styles = css`
        span.lit-element {
            color: lightblue;
        }
    `;

    @property({ type: Number }) count = 0;

    constructor() {
        super();
    }

    connectedCallback() {
        setInterval(() => {
            ++this.count;
        }, 1000);
    }

    render() {
        return html`
            <span class="lit-element">${this.count}</span>
        `;
    }
}

// CustomElements.define(tagName, Count);
