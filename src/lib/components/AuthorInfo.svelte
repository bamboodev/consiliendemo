<script lang="ts">
	export let author: string;


	function getAuthorInfo() {
		switch (author) {
			case 'Eric Kong':
				return {
					name: 'Eric Kong',
					title: 'CEO & Founder',
					linkedin: 'https://www.linkedin.com/in/eric-kong-48b3211/',
					bio: 'Eric Kong, CEO and co-founder of Consilien, has over two decades of IT leadership experience. After managing business continuity for a Fortune 100 company during the 9/11 tragedy, Eric founded Consilien in 2001 to deliver enterprise-grade IT and cybersecurity solutions to small and mid-sized businesses. His expertise drives tailored compliance, managed cybersecurity, and strategic IT solutions that empower businesses to thrive. '
				};
			case 'Fred Romero':
				return {
					name: 'Fred Romero',
					title: 'Technical Director',
					linkedin: 'https://www.linkedin.com/in/fvr3/',
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
			<h3 class="font-text font-bold text-gray-600 flex items-center gap-2">
				{authorInfo.name}
				{#if authorInfo.linkedin}
					<a href={authorInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="{authorInfo.name} on LinkedIn">
						<svg class="w-5 h-5 text-[#0A66C2] hover:text-[#004182] transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
				{/if}
			</h3>
			<!-- <p class="text-sm text-gray-600">{authorInfo.title}</p> -->
			<p class="text-sm text-gray-700 mt-2">{authorInfo.bio}</p>
		</div>
	</div>
{/if}
