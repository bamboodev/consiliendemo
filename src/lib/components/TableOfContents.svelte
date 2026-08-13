<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { TocEntry } from '$lib/utils/toc';

	export let entries: TocEntry[] = [];
	export let variant: 'inline' | 'sidebar' = 'inline';

	let open = true;
</script>

{#if variant === 'inline'}
	<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-8">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<svg
					class="w-5 h-5 text-gray-900 shrink-0"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"
					/>
				</svg>
				<h2 class="font-text text-sm font-bold uppercase tracking-widest text-gray-900">
					Table of Contents
				</h2>
			</div>
			<button
				class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
				on:click={() => (open = !open)}
				aria-expanded={open}
			>
				{open ? 'Collapse' : 'Expand'}
				<svg
					class="w-4 h-4 transform transition-transform duration-200 {open ? '' : 'rotate-180'}"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
				</svg>
			</button>
		</div>
		{#if open}
			<div class="mt-4 sm:columns-2 sm:gap-x-10" transition:slide={{ duration: 300 }}>
				{#each entries as entry, i}
					<a
						href="#{entry.id}"
						class="flex items-baseline gap-3 py-2.5 border-b border-gray-200 break-inside-avoid group"
					>
						<span class="font-text text-sm font-bold text-[#6DA63F] shrink-0">
							{String(i + 1).padStart(2, '0')}
						</span>
						<span class="font-text text-sm text-gray-700 group-hover:text-[#6DA63F]">
							{entry.text}
						</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="bg-white border border-gray-200 rounded-lg p-6">
		<h2 class="font-text text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">
			Table of Contents
		</h2>
		<div class="space-y-3">
			{#each entries as entry, i}
				<a href="#{entry.id}" class="flex items-baseline gap-3 group">
					<span class="font-text text-sm font-bold text-[#6DA63F] shrink-0">
						{String(i + 1).padStart(2, '0')}
					</span>
					<span class="font-text text-sm text-gray-700 group-hover:text-[#6DA63F]">
						{entry.text}
					</span>
				</a>
			{/each}
		</div>
	</div>
{/if}
