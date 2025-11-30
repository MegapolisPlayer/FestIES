<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	let { emoji, onclick = () => {}, label, triggered = false } = $props();

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
	type="button"
	onclick={() => {
		onclick();
	}}
	{id}
	aria-label={label}
>
	{#if !isHovering && !triggered}
		<i class="ri-{emoji}-line"></i>
	{:else}
		<i class="ri-{emoji}-fill"></i>
	{/if}
</button>
