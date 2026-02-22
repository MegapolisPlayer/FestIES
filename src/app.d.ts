import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '$lib/server/db/schema';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			dev: boolean;
			db: LibSQLDatabase<typeof schema>;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {}
	}
}

export {};
