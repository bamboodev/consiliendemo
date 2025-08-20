<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.CustomScriptSlice;
</script>

<section class="script-embed">
	{@html slice.primary.script}
</section>

<style>
	.script-embed {
		width: 100%;
		margin: 2rem 0;
	}
</style>