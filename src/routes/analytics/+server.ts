import { env } from '$env/dynamic/private';
import { containsId, updateId } from '$lib/server/concurrency';
import { json } from '@sveltejs/kit';
import { setCookies } from '$lib/server';

export const POST = async (event) => {
	if (env.DEV == 'true') return json({});

	setCookies(event);

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
