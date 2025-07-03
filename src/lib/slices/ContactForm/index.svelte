<!-- ContactForm.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	// Form data
	let formData = {
		email: '',
		firstName: '',
		lastName: '',
		phone: {
			area: '',
			prefix: '',
			line: ''
		},
		company: '',
		message: ''
	};

	let submitted = false;
	let error: string | null = null;
	let required = true;

	// Social media links
	const socialLinks = [
		{ platform: 'Twitter', url: 'https://twitter.com/consilien', icon: 'twitter' },
		{ platform: 'LinkedIn', url: 'https://linkedin.com/company/consilien', icon: 'linkedin' },
		{ platform: 'Facebook', url: 'https://facebook.com/consilien', icon: 'facebook' }
	];

	// Form validation
	function validateForm() {
		if (!formData.email) {
			error = 'Email address is required';
			return false;
		}
		return true;
	}

	// Helper function to format phone number as user types
	function formatPhoneInput(section: 'area' | 'prefix' | 'line', event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value.replace(/\D/g, '');
		let maxLength;

		switch (section) {
			case 'area':
				maxLength = 3;
				break;
			case 'prefix':
				maxLength = 3;
				break;
			case 'line':
				maxLength = 4;
				break;
		}

		formData.phone[section] = value.substring(0, maxLength);
	}

	onMount(() => {
		// Load Mailchimp script
		const script = document.createElement('script');
		script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
		script.type = 'text/javascript';
		document.head.appendChild(script);

		// // Initialize Mailchimp form
		// const mcScript = document.createElement('script');
		// mcScript.textContent = `
		// 	(function($) {
		// 		window.fnames = new Array();
		// 		window.ftypes = new Array();
		// 		fnames[0]='EMAIL';ftypes[0]='email';
		// 		fnames[1]='FNAME';ftypes[1]='text';
		// 		fnames[2]='LNAME';ftypes[2]='text';
		// 		fnames[4]='PHONE';ftypes[4]='phone';
		// 		fnames[5]='MMERGE5';ftypes[5]='text';
		// 		fnames[6]='MMERGE6';ftypes[6]='text';
		// 		fnames[3]='ADDRESS';ftypes[3]='address';
		// 	}(jQuery));
		// 	var $mcj = jQuery.noConflict(true);
		// `;
		// document.head.appendChild(mcScript);
	});
</script>

<div class="max-w-7xl mx-auto px-6 py-8">
	<div class="flex flex-col md:flex-row md:space-x-12 mt-12">
		<!-- Left column: Contact form -->
		<div class="md:w-1/2 mb-8 md:mb-0">
			<h2 class="text-2xl font-light text-gray-800 mb-2">
				Speak to a Consilien Representative Today.
			</h2>
			<p class="mb-6">
				Call <a href="tel:866.680.3388" class="text-[#6DA63F] hover:underline">866.680.3388</a>
			</p>

			<p class="text-right text-sm text-gray-600 mb-4">
				<span class="text-red-500">*</span> indicates required
			</p>

			<form
				action="https://consilien.us10.list-manage.com/subscribe/post?u=e5133804dfa530098a9c78f3d&amp;id=445e7120f1&amp;f_id=00aa47e4f0"
				method="post"
				id="mc-embedded-subscribe-form"
				name="mc-embedded-subscribe-form"
				class="validate space-y-6"
				target="_blank"
				novalidate
			>
				<div class="form-group">
					<label for="mce-EMAIL" class="block text-gray-700 mb-1">
						Email Address <span class="text-red-500">*</span>
					</label>
					<input
						type="email"
						name="EMAIL"
						id="mce-EMAIL"
						class="required email w-full p-2 border border-gray-300 rounded"
						required
						aria-required="true"
					/>
				</div>

				<div class="form-group">
					<label for="mce-FNAME" class="block text-gray-700 mb-1">First Name</label>
					<input
						type="text"
						name="FNAME"
						id="mce-FNAME"
						class="w-full p-2 border border-gray-300 rounded"
					/>
				</div>

				<div class="form-group">
					<label for="mce-LNAME" class="block text-gray-700 mb-1">Last Name</label>
					<input
						type="text"
						name="LNAME"
						id="mce-LNAME"
						class="w-full p-2 border border-gray-300 rounded"
					/>
				</div>

				<div class="form-group">
					<label for="mce-PHONE" class="block text-gray-700 mb-1">Phone Number</label>
					<div class="flex">
						<span class="inline-flex items-center px-2 text-gray-600">(</span>
						<input
							type="text"
							name="PHONE[area]"
							id="mce-PHONE-area"
							class="w-16 p-2 border border-gray-300"
							maxlength="3"
							pattern="[0-9]*"
						/>
						<span class="inline-flex items-center px-2 text-gray-600">)</span>
						<input
							type="text"
							name="PHONE[detail1]"
							id="mce-PHONE-detail1"
							class="w-16 ml-1 p-2 border border-gray-300"
							maxlength="3"
							pattern="[0-9]*"
						/>
						<span class="inline-flex items-center px-2 text-gray-600">-</span>
						<input
							type="text"
							name="PHONE[detail2]"
							id="mce-PHONE-detail2"
							class="w-24 p-2 border border-gray-300"
							maxlength="4"
							pattern="[0-9]*"
						/>
					</div>
					<p class="text-xs text-gray-600 mt-2">
						By submitting your phone number, you are opting in to receive recurring notifications,
						service messages, updates, and reminder messages from Consilien. Message and data rates
						apply, and message frequency varies. Mobile data will not be shared with any third party
						for marketing purposes. Text STOP to opt-out and HELP for assistance. Our <a
							href="/privacy-policy"
							class="text-[#6DA63F] hover:underline">privacy policy</a
						> and terms and conditions.
					</p>
				</div>

				<div class="form-group">
					<label for="mce-MMERGE5" class="block text-gray-700 mb-1">Company</label>
					<input
						type="text"
						name="MMERGE5"
						id="mce-MMERGE5"
						class="w-full p-2 border border-gray-300 rounded"
					/>
				</div>

				<div class="form-group">
					<label for="mce-MMERGE6" class="block text-gray-700 mb-1">Message</label>
					<textarea
						name="MMERGE6"
						id="mce-MMERGE6"
						rows="4"
						class="w-full p-2 border border-gray-300 rounded"
					></textarea>
				</div>

				<div id="mce-responses" class="clear">
					<div class="response" id="mce-error-response" style="display: none;"></div>
					<div class="response" id="mce-success-response" style="display: none;"></div>
				</div>

				<div aria-hidden="true" style="position: absolute; left: -5000px;">
					<input type="text" name="b_e5133804dfa530098a9c78f3d_445e7120f1" tabindex="-1" value="" />
				</div>

				<button
					type="submit"
					name="subscribe"
					id="mc-embedded-subscribe"
					class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 uppercase font-semibold"
				>
					Contact
				</button>
			</form>
		</div>

		<!-- Right column: Information -->
		<div class="md:w-1/2">
			<h2 class="text-2xl font-light text-gray-800 mb-4">
				At Consilien, we help organizations navigate the complex technology, security, and
				regulatory landscape.
			</h2>

			<p class="mb-4">
				We do this through our signature <strong>compliance and assessment services</strong> for
				PCI-DSS, CCPA, GDPR, HIPAA, NIST CSF, and more...; <strong>managed cybersecurity</strong>
				services that include Security Operations Center (SOC); and right-sized
				<strong>security strategy</strong> that meets our clients business needs and objectives.
			</p>

			<p class="mb-6">If you have a question, please contact us. We're here to help.</p>

			<div class="space-y-1 mb-6">
				<p class="text-gray-700">
					<strong>Address:</strong> 21250 Hawthorne Blvd Suite 500
				</p>
				<p class="text-gray-700 mb-4">Torrance, CA 90503</p>

				<p class="text-gray-700">
					<strong>Phone:</strong>
					<a href="tel:866.680.3388" class="hover:underline">866.680.3388</a>
				</p>

				<p class="text-gray-700">
					<strong>Fax:</strong> 310.549.5188
				</p>
			</div>

			<!-- Social media links -->
			<div class="flex space-x-4 mb-6">
				{#each socialLinks as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-[#6DA63F] rounded-full p-2 w-10 h-10 flex items-center justify-center text-gray-700"
						aria-label={link.platform}
					>
						{#if link.icon === 'twitter'}
							<svg class="w-5 h-5" fill="#fff" viewBox="0 0 24 24">
								<path
									d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"
								/>
							</svg>
						{:else if link.icon === 'linkedin'}
							<svg class="w-5 h-5" fill="#fff" viewBox="0 0 24 24">
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/>
							</svg>
						{:else if link.icon === 'facebook'}
							<svg class="w-5 h-5" fill="#fff" viewBox="0 0 24 24">
								<path
									d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
								/>
							</svg>
						{/if}
					</a>
				{/each}
			</div>

			<p class="text-gray-600 italic">
				Consilium (Latin): advice, suggestion, plan, deliberation, consultation, council.
			</p>
		</div>
	</div>
</div>

<style>
	#mc_embed_signup {
		background: #fff;
		clear: left;
		font-size: 14px;
		max-width: 600px;
		width: 100%;
	}

	#mc_embed_signup .button,
	#mc_embed_signup .button:hover {
		background-color: #f7731c;
	}
</style>
