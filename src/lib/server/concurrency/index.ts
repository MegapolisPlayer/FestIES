import { BEAT_FREQUENCY } from '$lib';
import { SvelteMap } from 'svelte/reactivity';

export const LAST_BEAT_AGE_FOR_ACTIVE = Math.trunc(BEAT_FREQUENCY * 1.25);

const concurrencyMap: SvelteMap<string, number> = new SvelteMap();

export const containsId = (key: string) => {
	return concurrencyMap.has(key);
};

export const updateId = (key: string) => {
	concurrencyMap.set(key, Date.now());
};

export const removeOld = (key: string) => {
	concurrencyMap.delete(key);
};

export const getActive = () => {
	const now = Date.now();
	concurrencyMap.forEach((value, key, map) => {
		if (now - value > LAST_BEAT_AGE_FOR_ACTIVE) {
			map.delete(key);
		}
	});

	return concurrencyMap.size;
};
