<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.JourneyMapSlice;

	function toggleModal(modalId: string) {
		const modal = document.getElementById(modalId);
		if (modal) {
			const currentDisplay = modal.style.display;
			modal.style.display = currentDisplay === 'none' ? 'flex' : 'none';
		}
	}

	function handleModalClick(event: MouseEvent, modalId: string) {
		const modal = event.currentTarget as HTMLElement;
		const modalContent = modal.querySelector('.box-s');
		if (modalContent && !modalContent.contains(event.target as Node)) {
			toggleModal(modalId);
		}
	}
</script>

<!-- <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	Placeholder component for {slice.slice_type} (variation: {slice.variation}) Slices
</section> -->

<section class="map py-36">
	<h2 class="text-center text-3xl md:text-4xl text-gray-800 font-light mb-16">
		Your Journey with Consilien
	</h2>

	<div class="imagemap relative">
		<img src="/images/Customer-Journey.jpg" class="map-img w-full" alt="Customer Journey Map" />
		<button
			class="area absolute rounded-full hover:bg-opacity-80 transition-colors w-12 h-12 animate-bounce-subtle flex items-center justify-center text-white text-2xl font-bold"
			title="Assessment"
			id="one"
			data-modal="myModa1"
			style="left: 15.47%; top: 12.72%; background-color: #800180;"
			on:click={() => toggleModal('myModa1')}
		>
			?
		</button>

		<button
			class="area absolute rounded-full hover:bg-opacity-80 transition-colors w-12 h-12 animate-bounce-subtle animation-delay-200 flex items-center justify-center text-white text-2xl font-bold"
			title="ReportRoadmap"
			id="two"
			data-modal="myModa2"
			style="left: 27.66%; top: 41.07%; background-color: #800180;"
			on:click={() => toggleModal('myModa2')}
		>
			?
		</button>

		<button
			class="area absolute rounded-full hover:bg-opacity-80 transition-colors w-12 h-12 animate-bounce-subtle animation-delay-400 flex items-center justify-center text-white text-2xl font-bold"
			title="Execution"
			id="three"
			data-modal="myModa3"
			style="left: 73.23%; top: 49.78%; background-color: #800180;"
			on:click={() => toggleModal('myModa3')}
		>
			?
		</button>

		<button
			class="area absolute rounded-full hover:bg-opacity-80 transition-colors w-12 h-12 animate-bounce-subtle animation-delay-600 flex items-center justify-center text-white text-2xl font-bold"
			title="Continuous"
			id="four"
			data-modal="myModa4"
			style="left: 68.85%; top: 3.79%; background-color: #800180;"
			on:click={() => toggleModal('myModa4')}
		>
			?
		</button>
	</div>

	<div class="container text-center">
		<h3 class="pt-6 text-center text-3xl md:text-4xl text-gray-800 font-light">
			We anticipate so you can innovate.
		</h3>
		<p class="mb0">
			<a
				href="/contact"
				class="inline-block my-6 bg-orange-500 border-2 border-white uppercase font-semibold text-xs text-white py-3 px-6 hover:bg-orange-600 hover:shadow transition duration-300 ease-out aos-init aos-animate"
				>Speak to an Expert</a
			>
		</p>
	</div>

	<div
		id="myModa1"
		class="moda fixed inset-0 hidden items-center justify-center z-50"
		style="display: none;"
		on:click={(e) => handleModalClick(e, 'myModa1')}
	>
		<div class="modal-backdrop fixed inset-0" style="background-color: rgba(0, 0, 0, 0.75);"></div>
		<div class="box-s bg_orange relative max-w-lg mx-auto p-8 rounded-lg shadow-xl z-10">
			<button
				class="close absolute top-4 right-4 text-2xl font-bold text-white hover:text-gray-200"
				on:click={() => toggleModal('myModa1')}>×</button
			>
			<h4 class="card-heading text-2xl font-bold text-white mb-4">Assessment</h4>
			<p class="mt16 text-white">
				We start with a comprehensive analysis of your current technological framework,
				understanding every nuance to ensure our solutions align perfectly with your needs.
			</p>
		</div>
	</div>

	<div
		id="myModa2"
		class="moda fixed inset-0 hidden items-center justify-center z-50"
		style="display: none;"
		on:click={(e) => handleModalClick(e, 'myModa2')}
	>
		<div class="modal-backdrop fixed inset-0" style="background-color: rgba(0, 0, 0, 0.75);"></div>
		<div class="box-s bg_green relative max-w-lg mx-auto p-8 rounded-lg shadow-xl z-10">
			<button
				class="close absolute top-4 right-4 text-2xl font-bold text-white hover:text-gray-200"
				on:click={() => toggleModal('myModa2')}>×</button
			>
			<h4 class="card-heading text-2xl font-bold text-white mb-4">Report/Roadmap</h4>
			<p class="mt16 text-white">
				Post-assessment, we provide a detailed report, which sheds light on your system's strengths
				and weaknesses as well as areas of opportunity and potential growth. Based on our findings,
				we chalk out a clear, strategic roadmap. Every step is designed to drive your business
				towards its goals.
			</p>
		</div>
	</div>

	<div
		id="myModa3"
		class="moda fixed inset-0 hidden items-center justify-center z-50"
		style="display: none;"
		on:click={(e) => handleModalClick(e, 'myModa3')}
	>
		<div class="modal-backdrop fixed inset-0" style="background-color: rgba(0, 0, 0, 0.75);"></div>
		<div class="box-s bg_orange relative max-w-lg mx-auto p-8 rounded-lg shadow-xl z-10">
			<button
				class="close absolute top-4 right-4 text-2xl font-bold text-white hover:text-gray-200"
				on:click={() => toggleModal('myModa3')}>×</button
			>
			<h4 class="card-heading text-2xl font-bold text-white mb-4">Execution</h4>
			<h5 class="subheading text-xl font-semibold text-white mb-2">Turning Insight into Action</h5>
			<p class="mt16 text-white">
				Equipped with a strategic roadmap, we put plans into motion-from deploying cutting-edge
				solutions to refining existing frameworks. We bridge the gap between strategy and success,
				ensuring your technological aspirations become tangible outcomes.
			</p>
		</div>
	</div>

	<div
		id="myModa4"
		class="moda fixed inset-0 hidden items-center justify-center z-50"
		style="display: none;"
		on:click={(e) => handleModalClick(e, 'myModa4')}
	>
		<div class="modal-backdrop fixed inset-0" style="background-color: rgba(0, 0, 0, 0.75);"></div>
		<div class="box-s bg_green relative max-w-lg mx-auto p-8 rounded-lg shadow-xl z-10">
			<button
				class="close absolute top-4 right-4 text-2xl font-bold text-white hover:text-gray-200"
				on:click={() => toggleModal('myModa4')}>×</button
			>
			<h4 class="card-heading text-2xl font-bold text-white mb-4">Continuous Proactive</h4>
			<h5 class="subheading text-xl font-semibold text-white mb-2">Evolve and Excel</h5>
			<p class="mt16 text-white">
				The digital landscape is ever-changing. We ensure you're not just adapting but staying
				ahead. With our continuous proactive improvement approach, your systems are always
				optimized, secure, and aligned with industry best practices.
			</p>
		</div>
	</div>
</section>

<style>
	@keyframes bounce-subtle {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.animate-bounce-subtle {
		animation: bounce-subtle 2s ease-in-out infinite;
	}

	.animation-delay-200 {
		animation-delay: 200ms;
	}

	.animation-delay-400 {
		animation-delay: 400ms;
	}

	.animation-delay-600 {
		animation-delay: 600ms;
	}

	.bg_orange {
		background-color: #ff6b35;
	}

	.bg_green {
		background-color: #6ea53f;
	}

	.modal-backdrop {
		backdrop-filter: blur(3px);
	}

	.moda {
		display: none;
	}

	.moda[style*='display: flex'] {
		display: flex !important;
	}
</style>
