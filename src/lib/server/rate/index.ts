import { RateLimiter } from 'sveltekit-rate-limiter/server';
import type { RequestEvent } from '@sveltejs/kit';

const limiter = new RateLimiter({
	IP: [5, 's'],
	IPUA: [5, 's']
});

export const isLimited = async (event: RequestEvent) => {
	if (event.isSubRequest) return; // Only rate limit main requests
	const rateLimitStatus = await limiter.check(event);
	return rateLimitStatus.limited;
};
