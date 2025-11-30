<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { LanguageType } from '$lib/types';
	import { writeDays, writeHours, writeMilliseconds, writeMinutes, writeSeconds, makeCountdown } from '$lib';

	let { target, locale, now, isNewYear }: { target: Date; locale: string, now: Date, isNewYear: boolean } = $props();

	let countdown = $derived(makeCountdown(target, now));
</script>

{#if !isNewYear}
{/if}
<div class="flex flex-col gap-2 whitespace-nowrap rounded-4xl bg-black/20 p-5 w-full">
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
		<div class="flex flex-col gap-0 {countdown.days > 0 ? "" : "text-neutral-500"}">
			<span>
				{Math.abs(countdown.days).toFixed().padStart(2, '0')}:
			</span>
			<span class="w-full text-center text-2xl font-light">
				{writeDays(countdown.days, locale)}
			</span>
		</div>

		<div class="flex flex-col gap-0 {countdown.hours > 0 || (countdown.hours == 0 && countdown.days > 0) ? "" : "text-neutral-500"}">
			<span>
				{Math.abs(countdown.hours).toFixed().padStart(2, '0')}:
			</span>
			<span class="w-full text-center text-2xl font-light">
				{writeHours(countdown.hours, locale)}
			</span>
		</div>

		<div class="flex flex-col gap-0">
			<span>
				{Math.abs(countdown.minutes).toFixed().padStart(2, '0')}:
			</span>
			<span class="w-full text-center text-2xl font-light">
				{writeMinutes(countdown.minutes, locale)}
			</span>
		</div>

        <div class="flex flex-col gap-0">
			<span>
				{Math.abs(countdown.seconds).toFixed().padStart(2, '0')}
			</span>
			<span class="w-full text-center text-2xl font-light">
				{writeSeconds(countdown.seconds, locale)}
			</span>
		</div>

		<div class="text-[4rem] text-neutral-500 flex flex-col gap-0 grow leading-12 overflow-hidden">
			<span class="flex flex-col grow w-full overflow-hidden">
				:{Math.abs(countdown.milliseconds).toFixed().padStart(3, '0')}
                <span class="grow text-left ps-4 {locale == "hu" ? "text-base" : "text-xl"} font-light">
                	{writeMilliseconds(countdown.milliseconds, locale)}
                </span>
			</span>
			<div class="grow"></div>
		</div>
	</div>
</div>
