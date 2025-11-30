<script lang="ts">
    import { m } from "$lib/paraglide/messages";
	import type { LanguageType } from "$lib/types";

    let { locale } = $props();
</script>

<div class="flex flex-col grow h-full w-1/4 rounded-4xl bg-black/20 p-5">
    <h2 class="text-2xl font-medium text-center w-full">{m.followingCities({}, { locale: locale as LanguageType})}</h2>
    <div class="grow"></div>
</div>