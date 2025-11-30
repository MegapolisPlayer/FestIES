<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import type { LanguageType } from "$lib/types";

    let { link, locale } = $props();
</script>

<div class="flex flex-col rounded-4xl bg-black/20 p-5 gap-2 w-full h-fit">
    <h2 class="whitespace-nowrap text-nowrap font-medium text-2xl text-ellipsis overflow-y-hidden overflow-x-scroll w-full">{m.musicPlayer({}, { locale: locale as LanguageType})}</h2>

	<iframe
		class=""
		src={link}
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe>
</div>
