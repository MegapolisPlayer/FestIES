<script lang="ts">
	import BottomBar from './BottomBar.svelte';
	import Modal from './Modal.svelte';
	import { m } from '$lib/paraglide/messages';
	import Button from './Button.svelte';
	import Countdown from './Countdown.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { locales } from '$lib/paraglide/runtime';
	import NextCities from './NextCities.svelte';
	import PrevCities from './PrevCities.svelte';
	import type { LanguageType } from '$lib/types';
	import MusicPlayer from './MusicPlayer.svelte';
	import Timezone from './Timezone.svelte';
    import AnalogClock from './AnalogClock.svelte';
	import JourneyBar from './JourneyBar.svelte';

	let settingsModal = $state(false);
	let feedbackModal = $state(false);
	let authorModal = $state(false);
	let changelogModal = $state(false);
	let helpModal = $state(false);

	let localeInterval: NodeJS.Timeout | undefined = $state(undefined);
	let currentLocaleIndex = $state(0);
	let currentLocale = $state('');

	const updateLocale = () => {
		currentLocaleIndex++;
		if (currentLocaleIndex === locales.length) currentLocaleIndex = 0;
		currentLocale = locales[currentLocaleIndex];
	};

	onMount(() => {
		localeInterval = setInterval(updateLocale, 3000);
	});
	onDestroy(() => {
		clearInterval(localeInterval);
	});
</script>

<div class="flex w-full grow flex-col gap-2 h-full">
	<div class="flex w-full grow-5 flex-row gap-6 p-5 pb-0!">
		<PrevCities locale={currentLocale} />

		<div class="flex w-full flex-col items-center justify-center gap-6">
			<Countdown target={new Date(2026, 0, 1, 0, 0, 0, 0)} locale={currentLocale} />

			<div class="grow-2 flex w-full flex-row items-center justify-center gap-6">
				<Timezone locale={currentLocale}/>
                
                <div class="flex grow flex-col gap-6 h-full justify-center items-center">
					<AnalogClock 
                        locale={currentLocale}
                    />
                    
                    <MusicPlayer
						link={'https://www.youtube-nocookie.com/embed/videoseries?si=nnVK9IsAMkVeEzF5&amp;list=PL5d1YE_8Im7MNADxq70-5zrxpCdOJkICX'}
						locale={currentLocale}
					/>
				</div>
			</div>
		</div>

		<NextCities locale={currentLocale} />
	</div>
    <JourneyBar />
</div>

<BottomBar
	{currentLocale}
	bind:settingsModal
	bind:feedbackModal
	bind:authorModal
	bind:helpModal
	bind:changelogModal
/>

<Modal bind:showModal={settingsModal}>
	<div class="flex w-full grow flex-col gap-2 text-white">
		<h2 class="text-xl font-medium">
			{m.settingsMenu({}, { locale: currentLocale as LanguageType })}
		</h2>
	</div>
</Modal>

<Modal bind:showModal={feedbackModal}>
	<div class="flex w-full grow flex-col gap-2 text-white">
		<h2 class="text-xl font-medium">{m.feedback({}, { locale: currentLocale as LanguageType })}</h2>
	</div>
</Modal>

<Modal bind:showModal={authorModal}>
	<div class="flex w-full grow flex-col gap-2 text-white">
		<h2 class="text-xl font-medium">{m.credits({}, { locale: currentLocale as LanguageType })}</h2>

		<Button
			text={m.close()}
			emoji={'close-circle'}
			onclick={() => {
				authorModal = false;
			}}
		/>
	</div>
</Modal>

<Modal bind:showModal={changelogModal}>
	<div class="flex w-full grow flex-col gap-2 text-white">
		<h2 class="text-xl font-medium">
			{m.changelog({}, { locale: currentLocale as LanguageType })}
		</h2>
	</div>
</Modal>

<Modal bind:showModal={changelogModal}>
	<div class="flex w-full grow flex-col gap-2 text-white">
		<h2 class="text-xl font-medium">
			{m.changelog({}, { locale: currentLocale as LanguageType })}
		</h2>
	</div>
</Modal>

<Modal bind:showModal={helpModal}>
	<div class="flex w-full grow flex-col gap-2 text-white">
		<h2 class="text-xl font-medium">{m.help({}, { locale: currentLocale as LanguageType })}</h2>
	</div>
</Modal>
