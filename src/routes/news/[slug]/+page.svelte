<script lang="ts">
	import { asHTML } from '@prismicio/helpers';
	export let data;

	$: ({ article } = data);
</script>

<div class="max-w-4xl mx-auto py-8 px-4">
	<h1 class="text-4xl font-bold mb-6">{article.data.title}</h1>
	<div class="prose prose-lg">
		{@html asHTML(article.data.content)}
	</div>
</div>
