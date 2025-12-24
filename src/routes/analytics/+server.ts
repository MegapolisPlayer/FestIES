import { containsId, updateId } from '$lib/server/concurrency/index.js';
import { json } from '@sveltejs/kit';

export const POST = async (event) => {
	let sessionId = event.cookies.get('sessionid');
	if (!sessionId || !containsId(sessionId)) {
		const uuid = crypto.randomUUID();
		event.cookies.set('sessionid', uuid, { path: '/' });
		sessionId = uuid;
		console.log('New user');
	}

	updateId(sessionId);
	//console.log("User heartbeat");

	return json({});
};
