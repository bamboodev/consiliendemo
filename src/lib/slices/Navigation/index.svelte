<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';

	export let slice: Content.NavigationSlice;
</script>

<nav data-slice-type="{slice.slice_type}" data-slice-variation="{slice.variation}">
	<ul class="main-menu">
		<li class="menu-item">
			<PrismicLink field={slice.primary.main_link}>
				{slice.primary.main_label}
			</PrismicLink>
			
			{#if slice.primary.submenu && slice.primary.submenu.length > 0}
				<ul class="submenu">
					{#each slice.primary.submenu as subItem}
						<li class="submenu-item">
							<PrismicLink field={subItem.link}>
								{subItem.label}
							</PrismicLink>
						</li>
					{/each}
				</ul>
			{/if}
		</li>
	</ul>
</nav>

<style>
	nav {
		width: 100%;
		padding: var(--size-3);
	}

	.main-menu {
		display: flex;
		list-style: none;
		gap: var(--size-5);
		margin: 0;
		padding: 0;
	}

	.menu-item {
		position: relative;
		padding: var(--size-2);
	}

	.submenu {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		background: var(--surface-2);
		border: 1px solid var(--surface-3);
		border-radius: var(--radius-2);
		padding: var(--size-2);
		min-width: 200px;
		box-shadow: var(--shadow-2);
		list-style: none;
	}

	.menu-item:hover .submenu {
		display: block;
	}

	.submenu-item {
		padding: var(--size-2);
	}

	.submenu-item:hover {
		background: var(--surface-3);
	}
</style>
