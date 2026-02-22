import { BEAT_FREQUENCY } from '$lib';
import type { RequestEvent } from '@sveltejs/kit';
import * as schema from '$lib/server/db/schema';
import { count, eq, lte } from 'drizzle-orm';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';

export const LAST_BEAT_AGE_FOR_ACTIVE = Math.trunc(BEAT_FREQUENCY * 1.25);

export const containsId = async (event: RequestEvent, key: string) => {
	let db = event.locals.db;

	return (await db.select().from(schema.sessions).where(eq(schema.sessions.uuid, key))).length > 0;
};

export const updateId = async (event: RequestEvent, key: string) => {
	let db = event.locals.db;

	await db
		.insert(schema.sessions)
		.values({
			uuid: key,
			time: String(Date.now())
		})
		.onConflictDoUpdate({
			set: {
				time: String(Date.now())
			},
			target: schema.sessions.uuid
		});
};

export const removeOld = async (event: RequestEvent, key: string) => {
	let db = event.locals.db;

	await db.delete(schema.sessions).where(eq(schema.sessions.uuid, key));
};

export const getActive = async (event: RequestEvent) => {
	const now = Date.now();

	let db = event.locals.db;

	await db
		.delete(schema.sessions)
		.where(lte(schema.sessions.time, String(now - LAST_BEAT_AGE_FOR_ACTIVE)));

	return (await (db as LibSQLDatabase<typeof schema>).select({ count: count() }).from(schema.sessions))[0].count;
};
