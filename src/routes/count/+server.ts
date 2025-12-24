import { asyncDelay } from '$lib';
import { getActive } from '$lib/server/concurrency/index.js';
import { produce } from 'sveltekit-sse';

export const POST = async () => {
	return produce(
		async (payload) => {
			while (true) {
				payload.emit('users', String(getActive()));
				await asyncDelay(100);
			}
		},
		{
			stop: () => {}
		}
	);
};
