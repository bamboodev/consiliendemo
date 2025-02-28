<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-center px-4">
	<h1 class="text-[#6DA63F] font-bold text-5xl block mb-4">
		{$page.status}: {$page.error?.message || 'Page not found'}
	</h1>

	{#if $page.status === 404}
		<p class="text-xl md:text-2xl mb-8">We couldn't find the page you were looking for.</p>
		<a
			href="/"
			class="flex items-center gap-2 bg-orange-500 border-2 border-white uppercase font-semibold text-xs text-white py-3 px-6 hover:bg-orange-600 hover:shadow transition duration-300 ease-out"
		>
			Go back to homepage
		</a>
	{:else}
		<p class="text-xl md:text-2xl mb-8">An unexpected error occurred.</p>
		<a
			href="/"
			class="flex items-center gap-2 bg-orange-500 border-2 border-white uppercase font-semibold text-xs text-white py-3 px-6 hover:bg-orange-600 hover:shadow transition duration-300 ease-out"
		>
			Go back to homepage
		</a>
	{/if}
</div>
