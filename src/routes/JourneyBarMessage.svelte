<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { LanguageType } from '$lib/types';
	import { fade } from 'svelte/transition';

	let { locale } = $props();
</script>

<div
	class="flex w-full grow flex-row items-center justify-center font-great max-lg:text-2xl max-lg:leading-8 lg:text-6xl lg:leading-20 text-center text-nowrap"
	transition:fade|global={{ duration: 250 }}
>
	{m.merryChristmasAndAHappyNewYearExclamation({}, { locale: locale as LanguageType })}
</div>
