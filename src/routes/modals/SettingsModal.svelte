<script lang="ts">
	import Modal from '../Modal.svelte';
	import Button from '../items/Button.svelte';

	let { settingsModal = $bindable(false) } = $props();
</script>

<Modal bind:showModal={settingsModal}>
	<div class="flex w-full grow flex-col gap-2 text-white">
		<h2 class="text-xl font-medium">Settings</h2>

		<Button
			text="Close"
			emoji={'close-circle'}
			onclick={() => {
				settingsModal = false;
			}}
		/>
	</div>
</Modal>
