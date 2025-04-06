<script context="module" lang="ts">
	// Declare jQuery types
	declare const $: JQueryStatic;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Content } from '@prismicio/client';

	export let slice: Content.RtoCalculatorSlice;

	onMount(() => {
		console.log('RtoCalculator');
		// Load required scripts
		const loadScript = (src: string) => {
			return new Promise((resolve, reject) => {
				const script = document.createElement('script');
				script.src = src;
				script.onload = resolve;
				script.onerror = reject;
				document.head.appendChild(script);
			});
		};

		// Load jQuery first
		loadScript('/assets/vendor/datto/js/jquery-git.js')
			.then(() => loadScript('/assets/vendor/datto/js/vue.min.js'))
			.then(() => loadScript('/assets/vendor/datto/js/dattorto.js'))
			.then(() => {
				// Initialize jQuery functionality
				(window as any).jQuery('#nobackup').click(function () {
					(window as any).jQuery('#nobackuptime').toggleClass('disable');
					(window as any).jQuery('.nobk').toggleClass('disable');
				});
			})
			.catch((error) => console.error('Error loading scripts:', error));
	});
</script>

<link rel="stylesheet" type="text/css" href="/assets/vendor/datto/css/dattorto.css" />
<link rel="stylesheet" type="text/css" href="/assets/vendor/datto/css/bootstrap-grid.css" />

<!-- Required - Copy the calculator div onto your site, Css and JS references the calculator ID to active the Program -->

<!-- START OF RTO -->
<div id="calculator">
	<section class="col-12 top">
		<p id="instruction">
			INPUT YOUR SPECIFIC NEEDS IN THE FIELDS BELOW FOR THE MOST ACCURATE INFORMATION. HOVER OVER
			THE QUESTION MARKS FOR MORE INFORMATION
		</p>
		<h2>Recovery &amp; Data Storage</h2>
		<div class="inputfield col-md-12 col-sm-12">
			<div onclick="return true" class="tooltip">
				<p class="icon">?</p>
				<span class="tooltiptext"
					>In order to give <span>you</span> a correct calculation we need to get an idea of how
					much data you have in
					<span>your</span> systems across
					<span>your</span> organization.</span
				>
			</div>
			<h6 class="col-md-6">How much data do <span>you</span> have on critical business systems?</h6>
			<div class="col-md-5 col-sm-12">
				<p class="pretag"></p>
				<input type="number" min="1" />
				<p class="posttag">GB</p>
			</div>
		</div>
		<div class="inputfield col-md-12 col-sm-12 dualfield">
			<div onclick="return true" class="tooltip">
				<p class="icon">?</p>
				<span class="tooltiptext"
					>What is the timeframe between each of
					<span>your</span> backups? E.g. every hour, once a day, once a week.</span
				>
			</div>
			<h6 class="col-md-6">How often do you back up this data?</h6>
			<div id="nobackuptime" class="col-md-5 col-sm-12">
				<div class="dual">
					<label>Hours</label><label>Mins</label> <input type="number" min="0" />
					<input type="number" min="0" />
				</div>
			</div>
			<h6 class="col-md-6" style="margin-left: 40px;"></h6>
			<div class="col-md-5 col-sm-12 nobkframe">
				<input id="nobackup" type="checkbox" style="margin: 0px; width: 16px; float: left;" />
				<label for="nobackup" style="width: auto; padding: 0px 0px 0px 10px;"
					><span>I</span> don't currently backup <span>my</span> data</label
				>
			</div>
		</div>
		<div class="inputfield col-md-12 col-sm-12 nobk dualfield">
			<div onclick="return true" class="tooltip">
				<p class="icon">?</p>
				<span class="tooltiptext"
					>From when disaster strikes, how long does it for your end user to notify you, for you to
					assess the situation, access your backups, and start the recovery process? Think of this a
					your reponse time.</span
				>
			</div>
			<h6 class="col-md-6">
				<span
					>On average how long does it take you to notify your IT Service Provider that there is an
					issue and for them to start trouble shooting the downtime incident?</span
				>
			</h6>
			<div class="col-md-5 col-sm-12">
				<div class="dual">
					<label>Hours</label><label>Mins</label> <input type="number" min="0" />
					<input type="number" min="0" />
				</div>
			</div>
		</div>
		<div class="inputfield col-md-12 col-sm-12 nobk">
			<div onclick="return true" class="tooltip">
				<p class="icon">?</p>
				<span class="tooltiptext"
					>Storing your data locally is designed for fast data transfers, however you are at risk if
					there is a disaster in the office such as fire, floods or theft. Cloud data is stored
					off-site, such as in a Datto data center, which brings an extra level of availability
					albeit at a slower speed for full bare metal restores.
				</span>
			</div>
			<h6 class="col-md-6"><span>Where do you currently store your backups?</span></h6>
			<div class="col-md-5 col-sm-12">
				<p class="pretag"></p>
				<div class="switch-field">
					<input type="radio" id="radio-one" name="recoverytype" value="local" checked="checked" />
					<label for="radio-one">Locally</label>
					<input type="radio" id="radio-two" name="recoverytype" value="cloud" />
					<label for="radio-two">In the Cloud</label>
					<input type="radio" id="radio-three" name="recoverytype" value="Both" />
					<label for="radio-three">Both</label>
				</div>
				<p class="posttag"></p>
			</div>
		</div>
		<!---->
	</section>
	<section class="col-12">
		<h2>Downtime &amp; Recovery Costs</h2>
		<div class="inputfield col-md-12 col-sm-12">
			<div onclick="return true" class="tooltip">
				<p class="icon">?</p>
				<span class="tooltiptext"
					>Nearly every employee will be impacted by an IT outage and will not be able to perform
					their job obligations to a certain degree. We recommend including the entire staff in this
					field.</span
				>
			</div>
			<h6 class="col-md-7">
				How many employees do <span>you</span>
				have?
			</h6>
			<div class="col-md-4 col-sm-12">
				<p class="pretag"></p>
				<input type="number" min="0" />
				<p class="posttag"></p>
			</div>
		</div>
		<div id="cost">
			<div class="inputfield col-md-12 col-sm-12">
				<div onclick="return true" class="tooltip">
					<p class="icon">?</p>
					<span class="tooltiptext"
						>Even if the business stops due to an outage and employees are not able to perform some,
						or all, of their duties, employee wages typically are still paid. We are assuming yours
						will need to be paid, and this must be included in your cost of downtime calculations.</span
					>
				</div>
				<h6 class="col-md-7">What is their average annual salary per employee?</h6>
				<div class="col-md-4 col-sm-12">
					<p class="pretag">$</p>
					<input type="number" />
					<p class="posttag"></p>
				</div>
			</div>
			<div class="inputfield col-md-12 col-sm-12">
				<div onclick="return true" class="tooltip">
					<p class="icon">?</p>
					<span class="tooltiptext"
						>All staff come with overhead costs like, gas, electric, rent, etc. Normally, this is
						about 50% of the average salary.</span
					>
				</div>
				<h6 class="col-md-7">What is their average annual overhead cost of an employee?</h6>
				<div class="col-md-4 col-sm-12">
					<p class="pretag">$</p>
					<input type="number" />
					<p class="posttag"></p>
				</div>
			</div>
			<div class="inputfield col-md-12 col-sm-12">
				<div onclick="return true" class="tooltip">
					<p class="icon">?</p>
					<span class="tooltiptext"
						>For most businesses, an outage will halt the ability to product and accrue revenue. We
						are assuming that your revenue will case during an outage, and so annual revenue helps
						to calculate the average cost of lost revenue during downtime.</span
					>
				</div>
				<h6 class="col-md-7">What is your <!----> businesses annual revenue?</h6>
				<div class="col-md-4 col-sm-12">
					<p class="pretag">$</p>
					<input type="number" />
					<p class="posttag"></p>
				</div>
			</div>
		</div>
	</section>
	<section class="col-12 bottom">
		<h2>Results</h2>
		<div id="numberresults">
			<div id="time" class="col-md-6 col-sm-12 PDFcurrent">
				<h4 id="currenttitle">Current Solution</h4>
				<div class="col-sm-12">
					<div onclick="return true" class="tooltip">
						<p class="icon">?</p>
						<span class="tooltiptext"
							>It's critical to regularly test your backups. In the case that a backup isn't
							working, you could be looking at additional losses of <strong>$34,668</strong> per failed
							backup.</span
						>
					</div>
					<div id="current1">
						<div>
							<p class="restitle">Time between backups</p>
							<h6>12hrs 00mins</h6>
						</div>
					</div>
				</div>
				<div class="col-sm-12">
					<div onclick="return true" class="tooltip">
						<p class="icon">?</p>
						<span class="tooltiptext"
							>This is the time it takes for your data to actually be downloaded back to your
							original device based on your backup location. Local backups will be quicker, but
							because a local disaster could take out local backups, but it’s always vital to ensure
							that you have a cloud backup as well.</span
						>
					</div>
					<div id="current2">
						<div>
							<p class="restitle">Recovery Processing Time</p>
							<div><h6>9hrs 6mins</h6></div>
						</div>
					</div>
				</div>
				<div class="col-sm-12">
					<div onclick="return true" class="tooltip">
						<p class="icon">?</p>
						<span class="tooltiptext"
							>If you experience a ransomware attack, you may be able to recover quickly. If you're
							faced with a fire or flood, you could be offsite for days and face higher costs than
							what you see here. <strong
								>The results below are estimates for a local backup with a data transfer speed of
								around 500MB/s</strong
							></span
						>
					</div>
					<div id="current3">
						<div>
							<div>
								<p class="restitle" style="margin-bottom: 20px; border-bottom: 1px solid;">
									Summary
								</p>
								<h6>
									Estimated Recovery Time &amp; Loss:<br />
									<strong style="color: rgb(77, 89, 103);">9hrs 6mins </strong>
									<strong>($26,296)</strong>
									<!---->
								</h6>
								<h6>
									Response Time you provided: <br /><strong style="color: rgb(77, 89, 103);"
										>0 hrs 30 mins</strong
									> <strong>($1,445)</strong>
								</h6>
								<h6
									style="font-size: 14px; font-weight: 200; color: rgb(155, 167, 181); width: 80%; margin-bottom: 33px; padding-top: 25px; border-top: 1px solid;"
								>
									Estimated Downtime &amp; Loss: <br />
									<strong style="color: rgb(77, 89, 103); font-size: 22px;"> 9hrs 36mins</strong>
									<strong> ($27,741)</strong>
								</h6>
								<h6 style="font-size: 13px; width: 78%; color: rgb(255, 120, 120);">
									<strong>Warning:</strong> Having local only backups could leave you vulnerable to
									hardware failures, office fires, floods or even theft. It's vital to have an
									offsite backup to really protect <span>your</span> business.
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="money" class="col-md-6 col-sm-12 PDFdatto">
				<h4 id="dattotitle">Datto SIRIS Solution</h4>
				<div class="col-sm-12">
					<div onclick="return true" class="tooltip">
						<p class="icon">?</p>
						<span class="tooltiptext"
							>Datto's SIRIS BCDR solutions allow you to backup as frequently as every 5 minutes.
							They also allow for regular testing and validation of your backups, reducing your risk
							even further.</span
						>
					</div>
					<div id="datto1">
						<div>
							<p class="restitle">Time between backups</p>
							<h6>5 mins</h6>
						</div>
					</div>
				</div>
				<div class="col-sm-12">
					<div onclick="return true" class="tooltip">
						<p class="icon">?</p>
						<span class="tooltiptext"
							>In case of a disaster, Datto can enable you to virtualize your backups, hosted in our
							cloud. On average, it only takes about 6 minutes to access the Datto portal, find your
							backup copy, and to virtualize it.</span
						>
					</div>
					<div id="datto2">
						<div>
							<p class="restitle">Average Recovery Processing Time</p>
							<h6>
								6 mins* <span
									>*Time to virtualization will vary depending on numerous factors including, but
									not limited to, the size of the SIRIS device, the availability and speeds of other
									local resources, the number of applications you are running, and server load.</span
								>
							</h6>
						</div>
					</div>
				</div>
				<div class="col-sm-12">
					<div onclick="return true" class="tooltip">
						<p class="icon">?</p>
						<span class="tooltiptext"
							>Downtime will always cost your business money. However, you can reduce it with a
							Datto business continuity/disaster recovery solution. Compared to your current
							solution, you could reduce your possible downtime losses by around <span class="total"
								>$26,007</span
							></span
						>
					</div>
					<div id="datto3">
						<div>
							<p class="restitle" style="margin-bottom: 20px; border-bottom: 1px solid;">Summary</p>
							<h6>
								Estimated Recovery Time &amp; Loss:<br />
								<strong style="color: rgb(77, 89, 103);">6 minutes</strong> <strong>($289)</strong>
							</h6>
							<h6>
								Response Time you provided: <br /><strong style="color: rgb(77, 89, 103);"
									>0 hrs 30 mins</strong
								> <strong>($1,445)</strong>
							</h6>
							<h6
								style="font-size: 14px; font-weight: 200; color: rgb(155, 167, 181); width: 80%; margin-bottom: 33px; padding-top: 25px; border-top: 1px solid;"
							>
								Estimated Downtime &amp; Loss: <br /><strong
									style="color: rgb(77, 89, 103); font-size: 22px;">0hrs 36mins</strong
								> <strong>($1,734)</strong><br />
								<span style="margin: 0px; font-style: normal; opacity: 1;"
									><strong
										class="total"
										style="margin-top: 10px; font-size: 20px; color: green; float: left;"
										>(-$26,007)</strong
									>
									<!----></span
								>
							</h6>
							<h6>
								<span
									>*all losses are merely an estimation of losses associated with technology, and
									does not reflect a calculation of actual losses to your business.</span
								>
							</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="pdfmain" class="results">
			<div id="results" class="col-md-12 col-sm-12">
				<h2>How long can <span>your</span> business survive?</h2>
				<div>
					<p>
						With the information that you've provided, and using certain assumptions made based on
						how businesses today typically function, we have estimated <span>your</span> downtime
						losses to be
						<span class="hoverspan"
							><strong>$2,889 per hour</strong>
							<span class="hoverdetail"
								>Calculation is made by taking Staff Salary, Overheads &amp; Revenue and breaking
								that down to an hourly cost for a 40 week &amp; 52 weeks of the year business, then
								multiplied by the number of staff.</span
							></span
						>.
					</p>
					<p>
						With <span>your</span> current backup &amp; recovery solution you could be looking at a
						estimated potential loss of around
						<span class="hoverspan"
							><strong><span>$27,741</span></strong><span class="hoverdetail"
								>Hourly Cost ($2,889) * Estimated Downtime (<span>9hrs 36mins</span>)</span
							></span
						>
						due to <strong><span>9hrs 36mins</span></strong> of downtime. This is assuming that
						<span>your</span>
						recovery process works exactly as planned, and could be worse if you experience any further
						glitches. For this reason, it's critical to regularly test <span>your</span>
						recovery capabilities. If the recovery process fails, <span>you</span>
						could be looking at additional losses of

						<span class="hoverspan"
							><strong>$34,668</strong>
							<span class="hoverdetail"
								>Estimated Downtime Cost per hour ($2,889) * Time between Backups (12hrs 00mins)</span
							></span
						>

						per recovery attempt.
					</p>
				</div>
				<h2>Are your backups at risk?</h2>
				<p>
					Local backups should be a key part of your data protection strategy<!---->. They allow you
					to recover data and restore operations quickly in the event of a primary server outage,
					data deletion, or a ransomware attack. However, local backup alone isn't enough. What
					happens if the local backup device is destroyed or inaccessible due to a fire, flood, or
					other disaster? That's why you need a secondary, offsite copy of backups.
				</p>
				<!---->
				<!---->
				<h2>How can you reduce the risk?</h2>
				<p>
					<span>The first step is to talk to your IT service provider or MSP about Datto.</span>
					Datto's SIRIS business continuity and disaster recovery (BCDR) solutions could reduce
					<span>your</span>
					downtime to <strong>0hrs 36mins</strong>
					and <span>your</span> overall downtime cost would fall to <strong>$1,734</strong>. In the
					rare case that the first recovery attempt doesn't work, your costs would only increase by
					<strong>$241</strong>, as opposed to <strong>$34,668</strong>.
				</p>
				<p>
					With Datto, even if you are experiencing an outage at your workplace, work doesn't have to
					stop. Datto Continuity can get you back to business in a little as <strong
						>6 minutes</strong
					> on virtual servers, which can be accessed anywhere you have working internet. Features like
					Ransomware Detection and Advanced Backup Verification let you rest easy knowing your backups
					will work in your time of need.
				</p>
			</div>
		</div>
	</section>
</div>

<!-- Required - ensure these scripts are used on your website's Footer -->
<!-- <script src='/assets/vendor/datto/js/vue.min.js'></script> -->

<!-- Required - To update the Currency edit the dattorto.js file -->
<!-- <script src="/assets/vendor/datto/js/dattorto.js"></script> -->
<!-- END OF RTO -->
