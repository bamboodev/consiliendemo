<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { PrismicImage } from '@prismicio/svelte';
	

	export let slice: Content.CardListSlice;
	// console.log('CardList slice items:', slice.items);
	// To see more details about the entire slice
	// console.log('Complete slice data:', slice);
</script>

<section data-slice-type="{slice.slice_type}" data-slice-variation="{slice.variation}">
	<PrismicRichText field="{slice.primary.heading}" />
	<div class="cards">
	  {#each slice.primary.card as card, index}
	  <article class="card">
		<header>
		  <PrismicRichText field={card.title} />
		</header>
	+ 	  <PrismicRichText field={card.description} />
	+ 	  <footer>
	+ 		  <PrismicImage field={card.image} />
	+ 		  <h4>{card.name}</h4>
	+ 	  </footer>
	  </article>
	  {/each}
	</div>
  </section>


  <style>
	.cards {
	  /* Create a responsive grid layout */
	  display: grid;
	  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	  gap: var(--size-8);
	  max-width: 900px;
	}
  
	article {
	  /* Some card styling */
	  border: 1px solid rgba(0, 0, 0, 0.6);
	  border-radius: var(--radius-3);
	  padding: var(--size-4);
	  box-shadow: var(--shadow-3);
	  background: var(--surface-2);
  
	  /* Layout for the card's content */
	  display: flex;
	  flex-direction: column;
	  align-items: left;
	  gap: var(--size-3);
	}

	footer {
  margin-top: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--size-3);
}

footer :global(img) {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: var(--radius-round);
}


  </style>
