<script>
	import ReviewCarousel from './../../lib/components/ReviewCarousel.svelte';
	import { servicesList, subscriptions } from '$lib/utils.js';
	import YTplayer from '$lib/components/YTplayer.svelte';
	import { currentLocation } from '$lib/utils.js';
	import { formatAddress } from '$lib/utils.js';
	import CarSelection from '$lib/components/CarSelection.svelte';

	export let data;
	let reviews = data?.recordsWithReviewAndRating;
	let isAddress = false;
	let isCoords = false;
	let isCarSize = false;

	if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
		if ($currentLocation === 'Address') {
			const oldLocation = localStorage?.getItem('address');
			if (oldLocation) {
				currentLocation.set(oldLocation);
			}
		}
	}

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

<div class="min-h-screen w-full flex flex-col items-center">
	<div class="h-full w-11/12">
		<div class="navbar bg-base-100">
			<div class="flex-1">
				<div>
					<span class="flex"
						><svg
							class="mt-1"
							fill="none"
							stroke="currentColor"
							width="9%"
							height="9%"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0" />
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
							<g id="SVGRepo_iconCarrier">
								<path
									d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z"
									stroke="currenColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
						</svg>

						<div><CarSelection /></div></span
					>
				</div>
			</div>

			<div class="flex-2">
				<div class="m-2">
					{#if $currentLocation === 'Address'}
						<span><a href="/set-location" class="text-sm">Set Address</a></span>
					{:else}
						<span><p class="text-sm">{formatAddress($currentLocation)}</p></span>
					{/if}
				</div>
				<a href="/set-location">
					<svg
						class="w-5"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						id="Outline"
						viewBox="0 0 24 24"
						width="10%"
						height="10%"
						><path
							d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"
						/><path
							d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z"
						/></svg
					>
				</a>
			</div>
		</div>

		<div class="mb-4">
			<YTplayer link="https://www.youtube.com/embed/JtH68PJIQLE?si=LJiaDOSieiO8mGH8" />
		</div>

		<div class="mb-6">
			<div class="grid grid-cols-2 grid-rows-2 gap-4">
				{#each servicesList as service}
					<div
						on:click={() => handleClick(service)}
						class="p-4 rounded-lg shadow-md cursor-pointer bg-base-150"
					>
						<img src={service.svg} alt="Service Icon" class="w-24 h-16 mx-auto mb-2" />
						<p class="text-center">{service.name}</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="w-full flex justify-center">
			<ReviewCarousel {reviews} />
		</div>
		<!-- <div class="w-full flex flex-col items-center">
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
		</div> -->
		<!-- <div class="w-full flex flex-col items-center">
			<h1>Refer a friend</h1>
			<Card />
		</div> -->
		<!-- <div class="w-full flex flex-col items-center mb-4">
			<FAQs />
		</div> -->
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
