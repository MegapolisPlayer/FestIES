import { containsId, updateId } from '$lib/server/concurrency';
import { isLimited } from '$lib/server/rate';
import { error, json } from '@sveltejs/kit';

export const POST = async (event) => {
	if (await isLimited(event)) {
		throw error(429, 'Too many requests.');
	}

	let sessionId = event.cookies.get('sessionid');
	if (!sessionId || !(await containsId(event, sessionId))) {
		const uuid = crypto.randomUUID();
		event.cookies.set('sessionid', uuid, { path: '/' });
		sessionId = uuid;
		console.log('New user');
	}

	await updateId(event, sessionId);
	//console.log("User heartbeat");

	return json({});
};