<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages';
	import type { LanguageType } from '$lib/types';
	import { writeDays, writeHours, writeMilliseconds, writeMinutes, writeSeconds } from '$lib';

	let { target, locale }: { target: Date; locale: string } = $props();

	let interval: NodeJS.Timeout | undefined = $state(undefined);
	let now = $state(new Date());
	let days = $derived(Math.trunc((target.getTime() - now.getTime()) / 1000 / 60 / 60 / 24));
	let hours = $derived(Math.trunc((target.getTime() - now.getTime()) / 1000 / 60 / 60) % 24);
	let minutes = $derived(Math.trunc((target.getTime() - now.getTime()) / 1000 / 60) % 60);
	let seconds = $derived(Math.trunc((target.getTime() - now.getTime()) / 1000) % 60);
	let milliseconds = $derived((target.getTime() - now.getTime()) % 1000);

	onMount(() => {
		interval = setInterval(() => {
			now = new Date();
		}, 10);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="flex flex-col gap-2 whitespace-nowrap rounded-4xl bg-black/20 p-10 w-full">
	<div class="flex flex-row w-full gap-2">
 <h2 class="text-2xl font-medium">
		{m.untilNewYearRemainingDotDotDot({}, { locale: locale as LanguageType })}
	</h2>
    <div class="grow"></div>
    <p>
        {now.getHours().toFixed().padStart(2, '0')}:{now.getMinutes().toFixed().padStart(2, '0')}:{now.getSeconds().toFixed().padStart(2, '0')}
        <span class="text-neutral-500">:{now.getMilliseconds().toFixed().padStart(3, '0')}</span> |
        {now.getDate()}.{(now.getMonth()+1)}.{now.getFullYear()}
    </p>
    </div>
	<!-- 38 = ~9.5rem  (40 = 10rem) -->
	<div class="m-0! flex flex-row gap-0 p-0! text-[10rem] leading-30 font-bold">
		{#if days > 0}
			<div class="flex flex-col gap-0">
				<span>
					{days.toFixed().padStart(2, '0')}:
				</span>
				<span class="w-full text-center text-2xl font-light">
					{writeDays(days, locale)}
				</span>
			</div>
		{/if}
		{#if hours > 0 || (hours == 0 && days > 0)}
			<div class="flex flex-col gap-0">
				<span>
					{hours.toFixed().padStart(2, '0')}:
				</span>
				<span class="w-full text-center text-2xl font-light">
					{writeHours(hours, locale)}
				</span>
			</div>
		{/if}

		<div class="flex flex-col gap-0">
			<span>
				{minutes.toFixed().padStart(2, '0')}:
			</span>
			<span class="w-full text-center text-2xl font-light">
				{writeMinutes(minutes, locale)}
			</span>
		</div>

        <div class="flex flex-col gap-0">
			<span>
				{seconds.toFixed().padStart(2, '0')}
			</span>
			<span class="w-full text-center text-2xl font-light">
				{writeSeconds(seconds, locale)}
			</span>
		</div>

		<div class="text-[5rem] text-neutral-500 flex flex-col gap-0 grow leading-20">
			<span class="flex flex-col grow w-full">
				:{milliseconds.toFixed().padStart(3, '0')}
                <span class="text-left ps-8 text-2xl font-light">
                	{writeMilliseconds(milliseconds, locale)}
                </span>
			</span>
			<div class="grow"></div>
		</div>
	</div>
</div>
