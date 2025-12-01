<script lang="ts">
	import Modal from '../Modal.svelte';
	import Button from '../items/Button.svelte';

	let { changelogModal = $bindable(false) } = $props();
</script>

<Modal bind:showModal={changelogModal}>
	<div class="flex w-full grow flex-col gap-2 text-white">
		<h2 class="text-xl font-medium">Changelog</h2>

		<div class="flex w-full max-w-full min-w-full flex-col gap-0 text-white">
			<h2 class="text-xl">FestIES 1.0</h2>
			<p class="italic opacity-50">30.11.2025</p>
			<ul class="list-inside list-disc">
				<li>Original version</li>
			</ul>
		</div>

		<Button
			text="Close"
			emoji="close-circle"
			onclick={() => {
				changelogModal = false;
			}}
		/>
	</div>
</Modal>
