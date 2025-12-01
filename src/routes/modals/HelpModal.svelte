<script lang="ts">
	import Modal from '../Modal.svelte';
	import Button from '../items/Button.svelte';

	let { helpModal = $bindable(false) } = $props();
</script>

<Modal bind:showModal={helpModal}>
	<div class="flex w-full grow flex-col gap-2 text-white">
		<h2 class="text-xl font-medium">Help</h2>

		<p>
			FestIES is a successor to CNyIES - and a program which plays music, shows the new year
			countdown and, overall, makes the atmosphere a tiny bit more festive.
		</p>

		<p>Customization of the program is done in the settings menu. (gear icon)</p>

		<p>The bottom bar can be hidden/shown by clicking on it.</p>

		<a href="https://megapolisplayer.github.io/apps/cnyies/" class="underline"
			>Link to old program (CNyIES)</a
		>

		<Button
			text="Close"
			emoji="close-circle"
			onclick={() => {
				helpModal = false;
			}}
		/>
	</div>
</Modal>
