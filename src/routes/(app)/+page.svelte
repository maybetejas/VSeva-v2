<script>
	import FAQs from './../../lib/components/FAQs.svelte';
	import Card from './../../lib/components/Card.svelte';
	import ReviewCarousel from './../../lib/components/ReviewCarousel.svelte';
	import { servicesList, subscriptions } from '$lib/utils.js';
	import YTplayer from '$lib/components/YTplayer.svelte';
	export let data;
	let isAddress = false;
	let isCoords = false;
	let isCarSize = false;

	$: popupMessage = isCarSize
		? 'Please set the car size.'
		: isAddress
		? 'Please set the address.'
		: isCoords
		? 'Please set the location from the address tab.'
		: '';

	function handleClick(service) {
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			// Check if data is missing in localStorage and set the flags accordingly
			if (!localStorage?.getItem('carSize')) {
				isCarSize = true;
			}
			if (!localStorage?.getItem('address')) {
				isAddress = true;
			}
			if (!localStorage?.getItem('coords')) {
				isCoords = true;
			}

			// Check if any flag is true (data is missing), then don't navigate and perform some action like showing a popup
			if (isCarSize || isAddress || isCoords) {
				// Do something here, like showing a popup
				console.log('Data is missing!');
			} else {
				// All data is present, navigate to the desired URL
				window.location.href = `/services/${service.id}`;
			}
		}
	}

	function closePopup() {
		// Reset the flags when the popup is closed
		isCarSize = false;
		isAddress = false;
		isCoords = false;
	}
</script>

<div class="w-full flex flex-col items-center">
	<div class="h-full w-11/12">
		<div><YTplayer link="https://www.youtube.com/embed/6F2XzwW4X-I?si=pTeyw0VMOgSDQhma" /></div>

		<div>
			<div class="grid grid-cols-3 grid-rows-2 gap-4">
				{#each servicesList as service}
					<div
						on:click={() => handleClick(service)}
						class="p-4 rounded-lg shadow-lg cursor-pointer bg-gray-700"
					>
						<img src={service.svg} alt="Service Icon" class="w-16 h-16 mx-auto mb-2" />
						<p class="text-center">{service.name}</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="w-full bg-slate-200 flex justify-center">
			<ReviewCarousel />
		</div>
		<div class="w-full flex flex-col items-center">
			<h1>Subscribe</h1>
			<div class="grid grid-cols-3 grid-rows-1 gap-4 w-full">
				{#each subscriptions as subs}
					<div
						on:click={() => handleClick(subs)}
						class="p-4 rounded-lg shadow-lg cursor-pointer bg-gray-700"
					>
						<img src={subs.svg} alt="Service Icon" class="w-16 h-16 mx-auto mb-2" />
						<p class="text-center">{subs.name}</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="w-full flex flex-col items-center">
			<h1>Refer a friend</h1>
			<Card />
		</div>
		<div class="w-full flex flex-col items-center">
			<FAQs />
		</div>
	</div>
</div>
{#if isCarSize || isAddress || isCoords}
	<div
		class="absolute top-1/2 bg-green-900 w-1/2 h-20 rounded-lg flex flex-col justify-center items-center p-4"
	>
		<p>{popupMessage}</p>
		{#if isAddress && isCoords}
			<a href="/set-location"
				><button class="btn btn-outline btn-xs">Set Address and Location</button></a
			>
		{/if}
		{#if isAddress && !isCoords}
			<a href="/set-location"><button class="btn btn-outline btn-xs">Set Address</button></a>
		{/if}
		{#if isCoords && !isAddress}
			<a href="/set-location"><button class="btn btn-outline btn-xs">Set Location</button></a>
		{/if}
		{#if isCarSize}
			<button on:click={closePopup} class="btn btn-base btn-outline mt-2">Close</button>
		{/if}
	</div>
{/if}
