import { type RequestHandler } from "@sveltejs/kit";
import { ImageResponse } from "$lib/image-response";
import Card from "$lib/card.svelte";

const width = 1600;
const height = 900;

export const GET = (async ({ fetch }) => {

	const response = await fetch('/noto.ttf');
	const noto = await response.arrayBuffer();

	return new ImageResponse(
		Card,
		{},
		{
			fonts: [
				{
					name: 'Noto',
					data: Buffer.from(noto),
					weight: 600,
					style: 'normal'
				}
			],
			width,
			height
		}
	);

}) satisfies RequestHandler;