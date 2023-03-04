import { html, css, LitElement } from "lit";
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
        span {
            color: coral;
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
        return html`<span>Lit ${this.count}</span>`;
    }
}

// customElements.define(tagName, Count);
