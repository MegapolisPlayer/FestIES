import type { LanguageType } from '$lib/types.js';
import { setCookies } from '$lib/server';

export const load = async (event) => {
	await setCookies(event);

	return {
		background: event.cookies.get('background') as string,
		languages: JSON.parse(event.cookies.get('languages') as string) as LanguageType[],
		playlist: event.cookies.get('playlist') as string,
		millisecond: (event.cookies.get('millisecond') as string) == 'true',
		journey: (event.cookies.get('journey') as string) == 'true',
		countdown: new Date(parseInt(event.cookies.get('time'))),
		snow: parseInt(event.cookies.get('snow') as string)
	};
};
