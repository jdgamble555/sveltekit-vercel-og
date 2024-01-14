import { type RequestHandler } from "@sveltejs/kit";
import { ImageResponse } from "$lib/image-response";
import Card from "$lib/card.svelte";

const width = 1600;
const height = 900;

// 1200 x 675 - 16x9
// 1200 x 1200 - 1x1 - google feature image
// 1200 x 900 - 4x3

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