<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/snowflake-line.svg';
	import 'remixicon/fonts/remixicon.css';
	import { m } from '$lib/paraglide/messages';
	import Snowflakes from './Snowflakes.svelte';
	import { browser } from '$app/environment';
	import { BEAT_FREQUENCY } from '$lib';

	let { children, data } = $props();

	if (browser) {
		let interval: NodeJS.Timeout | undefined = $state(undefined);

		const beatInterval = () => {
			navigator.sendBeacon('/analytics');
		};

		const setBeatInterval = () => {
			beatInterval();
			interval = setInterval(beatInterval, BEAT_FREQUENCY);
		};

		addEventListener('load', setBeatInterval);
		addEventListener('visibilitychange', () => {
			if (document.hidden) {
				//premature leave, otherwise the heartbeat system will catch it
				clearInterval(interval);
				navigator.sendBeacon('/goodbye');
			} else {
				setBeatInterval();
			}
		});
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>
		{m.nameShort()}
	</title>
</svelte:head>

<div class="relative m-0 flex h-full w-full grow flex-col p-0 text-white">
	<div class="absolute z-1 h-full w-full" style="background-color: {data.background}"></div>
	{#key data.snow}
		<Snowflakes snowLimit={data.snow} />
	{/key}
	<div class="z-10 flex w-full grow flex-col">
		{@render children?.()}
	</div>
</div>
