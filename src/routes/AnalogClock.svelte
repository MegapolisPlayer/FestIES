<script lang="ts">
    import { m } from "$lib/paraglide/messages";
	import type { LanguageType } from "$lib/types";

    let { locale } = $props();     
</script>

<div class="flex flex-col rounded-4xl bg-black/20 p-5 grow w-full">
    <h2 class="font-medium text-2xl">{m.clock({}, { locale: locale as LanguageType})}</h2>
</div>