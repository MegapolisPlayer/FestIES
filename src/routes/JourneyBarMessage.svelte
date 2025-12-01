<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { LanguageType } from '$lib/types';

	let { locale } = $props();
</script>

<div class="flex w-full grow flex-row items-center justify-center font-great text-6xl leading-20">
	{m.merryChristmasAndAHappyNewYearExclamation({}, { locale: locale as LanguageType })}
</div>
