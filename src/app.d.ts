import type { KVNamespace } from '@cloudflare/workers-types';
import type { SvelteMap } from 'svelte/reactivity';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			localmap: SvelteMap<string, number>;
			prodmap: KVNamespace<string>;
			dev: boolean;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				CONCURRENCY: KVNamespace<string>;
			}
		}
	}
}

export {};
