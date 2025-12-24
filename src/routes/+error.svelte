<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex w-full grow flex-col items-center justify-center">
	<div class="flex flex-col items-center justify-center rounded-lg bg-black/20 p-5 shadow-lg">
		<div class="text-3xl font-medium">An error occured.</div>
		<div class="text-9xl font-bold">
			{page.status}
		</div>
		<div class="text-3xl">
			<span class="opacity-50"> Message: </span>
			{page.error?.message}
		</div>
	</div>
</div>
