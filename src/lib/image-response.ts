// Thanks to https://geoffrich.net/posts/svelte-social-image/

import { ImageResponse as VercelOGImageResponse } from '@vercel/og';
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { html } from 'satori-html';

// https://svelte.dev/docs/typescript#types

function unescapeHtml(html: string) {
    return html
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

export interface SvelteComponentSSR<T extends SvelteComponent> {
    render: (
        props?: ComponentProps<T>
    ) => SvelteRenderResult;
}

export interface SvelteRenderResult {
    html: string;
    css: {
        code: string;
        map: null;
    };
    head: string;
}

export class ImageResponse<T extends SvelteComponent> extends VercelOGImageResponse {
    constructor(
        component: ComponentType<T>,
        props?: ComponentProps<T>,
        options?: ConstructorParameters<typeof VercelOGImageResponse>[1]
    ) {
        const result = (component as unknown as SvelteComponentSSR<T>).render(props);
        const element = html(unescapeHtml(`${result.html}<style>${result.css.code}</style>`));
        super(element, options);
    }
}