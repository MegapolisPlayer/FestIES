<script lang="ts">
	import { page } from "$app/state";
</script>

<div class="flex flex-col w-full grow justify-center items-center">
	<div class="bg-black/20 shadow-lg flex flex-col rounded-lg p-5 justify-center items-center">
		<div class="text-3xl font-medium">
			An error occured.
		</div>
		<div class="font-bold text-9xl">
			{page.status}
		</div>
		<div class="text-3xl">
			<span class="opacity-50">
				Message:
			</span>
			{page.error?.message}
		</div>
	</div>
</div>