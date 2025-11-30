<script lang="ts">
	import { browser } from '$app/environment';
	import { m } from '$lib/paraglide/messages';
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
    import IconButton from './IconButton.svelte';
    import type { LanguageType } from '$lib/types';

	let {
		settingsModal = $bindable(false),
		feedbackModal = $bindable(false),
		authorModal = $bindable(false),
        helpModal = $bindable(false),
		changelogModal = $bindable(false),
        currentLocale
	} = $props();

	let ready = $state(false);
	let clicked = $state(false);

	const clickHandler = (e: MouseEvent) => {
		if (document.getElementById('bottom')?.contains(document.elementFromPoint(e.pageX, e.pageY))) {
			clicked = !clicked;
		}
	};

	onMount(() => {
		if (!browser) return;
		document.addEventListener('click', clickHandler, { passive: true });
	});

	onDestroy(() => {
		if (!browser) return;
		document.removeEventListener('click', clickHandler);
	});
</script>

{#if !clicked}
    <div class="h-10! w-full"></div>
{/if}

{#key ready || clicked}
	<div
		class="
    h-10! z-50 absolute bottom-0 flex w-full flex-row items-center gap-2 border-t-2 border-gray-800 bg-gray-500 p-2 text-2xl text-gray-800
    {!clicked ? 'opacity-100' : 'opacity-0'}
    "
		transition:fly={{ duration: 250, opacity: 0, x: 0, y: 100 }}
	>
		<span class="grow flex flex-row gap-2" id="bottom">
            <p class="text-lg font-bold">
                {m.nameShort({}, { locale: currentLocale as LanguageType })}
            </p>

            <p class="text-lg">
                {m.nameLong({}, { locale: currentLocale as LanguageType })}
            </p>

            <div class="grow"></div>
        </span>

        <IconButton
			onclick={() => {
				helpModal = true;
			}}
			label={m.help({}, { locale: currentLocale as LanguageType })}
            emoji={"question"}
            triggered={helpModal}
		/>

		<IconButton
			onclick={() => {
				settingsModal = true;
			}}
			label={m.settingsMenu({}, { locale: currentLocale as LanguageType })}
            emoji={"settings-3"}
            triggered={settingsModal}
		/>

		<IconButton
			onclick={() => {
				feedbackModal = true;
			}}
			label={m.feedback({}, { locale: currentLocale as LanguageType })}
            triggered={feedbackModal}
            emoji={"feedback"}
		/>

		<IconButton
			onclick={() => {
				changelogModal = true;
			}}
			label={m.changelog({}, { locale: currentLocale as LanguageType })}
            emoji={"file-edit"}
            triggered={changelogModal}
		/>

		<IconButton
			onclick={() => {
				authorModal = true;
			}}
			label={m.credits({}, { locale: currentLocale as LanguageType })}
            emoji={"user-3"}
            triggered={authorModal}
		/>
	</div>
{/key}
