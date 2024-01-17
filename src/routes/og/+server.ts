import { type RequestHandler } from "@sveltejs/kit";
import { ImageResponse } from "$lib/image-response";
import Card from "$lib/card.svelte";

const width = 1600;
const height = 900;

export const config = {
    runtime: 'nodejs18.x'
};

export const GET = (async ({ fetch }) => {

	const response = await fetch('https://og-playground.vercel.app/inter-latin-ext-400-normal.woff');
	const fontData = await response.arrayBuffer();

	return new ImageResponse(
		Card,
		{
			fonts: [
				{
					name: 'Inter Latin',
					data: fontData,
					weight: 600,
					style: 'normal'
				}
			],
			width,
			height
		},
		{ text: 'Ready to dive in?', spanText: 'Start your free trial today.' }
	);

}) satisfies RequestHandler;