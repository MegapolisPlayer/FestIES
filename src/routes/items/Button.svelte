<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	let {
		text,
		type = 'button',
		emoji,
		onclick = () => {},
		label = '',
		children = undefined
	} = $props();

	let button: HTMLButtonElement | undefined = $state(undefined);
	let isHovering = $state(false);
	let id = $state(crypto.randomUUID());

	const moveHandler = (e: MouseEvent) => {
		isHovering =
			document.getElementById(id)?.contains(document.elementFromPoint(e.pageX, e.pageY)) ?? false;
	};

	onMount(() => {
		if (!browser) return;
		document.addEventListener('mousemove', moveHandler, { passive: true });
	});

	onDestroy(() => {
		if (!browser) return;
		document.addEventListener('mousemove', moveHandler, { passive: true });
	});
</script>

<button
	bind:this={button}
	type={type as string as 'button' | 'submit' | 'reset'}
	class="button-dialog"
	onclick={() => {
		onclick();
	}}
	{id}
	aria-label={label}
>
	{#if children}
		{@render children?.()}
	{:else}
		{#if !isHovering}
			<i class="ri-{emoji}-line"></i>
		{:else}
			<i class="ri-{emoji}-fill"></i>
		{/if}
		{text}
	{/if}
</button>
