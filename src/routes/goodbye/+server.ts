import { containsId, removeOld } from '$lib/server/concurrency/index.js';
import { error, json } from '@sveltejs/kit';

//supports navigator.sendBeacon

export const POST = async (event) => {
	const sessionId = event.cookies.get('sessionid');
	if (!sessionId || !containsId(sessionId)) {
		return error(404);
	}

	removeOld(sessionId);
	event.cookies.delete('sessionid', { path: '/' });

	console.log('User left');

	return json({});
};
