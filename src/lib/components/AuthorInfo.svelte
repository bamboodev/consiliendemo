<script lang="ts">
	export let author: string;

	$: console.log('author', author);

	function getAuthorInfo() {
		switch (author) {
			case 'Eric Kong':
				return {
					name: 'Eric Kong',
					title: 'CEO & Founder',
					bio: 'Eric Kong, CEO and co-founder of Consilien, has over two decades of IT leadership experience. After managing business continuity for a Fortune 100 company during the 9/11 tragedy, Eric founded Consilien in 2001 to deliver enterprise-grade IT and cybersecurity solutions to small and mid-sized businesses. His expertise drives tailored compliance, managed cybersecurity, and strategic IT solutions that empower businesses to thrive. '
				};
			case 'Fred Romero':
				return {
					name: 'Fred Romero',
					title: 'Technical Director',
					bio: 'Fred Romero serves as Chief Technology Officer and Partner at Consilien, bringing extensive technical expertise and strategic vision to the organization. With a deep background in enterprise IT infrastructure and cybersecurity, Fred leads the technical direction of the company while ensuring cutting-edge solutions for clients.'
				};
			default:
				return null;
		}
	}

	$: authorInfo = getAuthorInfo();
</script>

{#if authorInfo}
	<div class="bg-gray-50 p-6 rounded-lg">
		<h2 class="text-lg font-text uppercase text-xs text-gray-600 font-bold tracking-widest mb-4">
			About the Author
		</h2>
		<hr class="border-gray-200 mb-4" />
		<div class="space-y-2">
			<h3 class="font-text font-bold text-gray-600">{authorInfo.name}</h3>
			<!-- <p class="text-sm text-gray-600">{authorInfo.title}</p> -->
			<p class="text-sm text-gray-700 mt-2">{authorInfo.bio}</p>
		</div>
	</div>
{/if}
