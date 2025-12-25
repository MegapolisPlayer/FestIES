import { asyncDelay } from '$lib';
import { getActive } from '$lib/server/concurrency';
import { produce } from 'sveltekit-sse';
import { isLimited } from '$lib/server/rate';
import { error } from '@sveltejs/kit';

export const POST = async (event) => {
if (await isLimited(event)) {
		throw error(429, 'Too many requests.');
	}

	return produce(
		async (payload) => {
			while (true) {
				payload.emit('users', String(await getActive(event)));
				await asyncDelay(2500);
			}
		},
		{
			stop: () => {}
		}
	);
};