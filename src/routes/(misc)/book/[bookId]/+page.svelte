<script>
	import DateSelector from './../../../../lib/components/DateSelector.svelte';
	import {
		calculatePrice,
		calculateTime,
		currentCarSize,
		deleteOverlappingSlotsForWashers,
		formatDate2,
		getDistance
	} from './../../../../lib/utils.js';
	import Rain from '$lib/components/Rain.svelte';
	import { servicesList } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { PUBLIC_DB_URL } from '$env/static/public';
	import PocketBase from 'pocketbase';

	const pb = new PocketBase(PUBLIC_DB_URL);
	pb.autoCancellation(false);

	let availableSlots = [];
	let filteredWashers = []; //filtered list off washers in the users area
	let filledSlotsForSelectedDate = []; //realtime dynamic raray that chnages based on the selectedDate and
	// conatines filled slost for the date for every washer in the
	// filteredWahsers array

	//get price an services based on the url parameters
	const id = $page.params.bookId;
	const selectedService = servicesList.find((service) => service.id === parseInt(id));

	let name = '';
	let link = '';
	let services = [];

	if (selectedService) {
		name = selectedService.name;
		link = selectedService.link;
		services = selectedService.services;
	}

	let triggerRain = false;

	function rain() {
		triggerRain = !triggerRain;
	}

	let price = 0;
	$: price = calculatePrice($currentCarSize, name);
	let selectedDate = '';
	let day = '';
	$: day = selectedDate.toLocaleString('default', { weekday: 'long' });
	const time = calculateTime($currentCarSize, name);

	//initialising the washers in your area everytime the page first loads or is mounted
	onMount(async () => {
		filteredWashers = await getWashers();
		console.log('washers: ', filteredWashers);
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			if ($currentCarSize === 'compact') {
				const oldCarSize = localStorage?.getItem('carSize');
				if (oldCarSize) {
					currentCarSize.set(oldCarSize);
				}
			}
		}
	});

	///realtime subscribed to the array
	pb.collection('filledSlots').subscribe('*', async (e) => {
		filterFilledSlotsByWashers();
	});

	//reacting to the changes made in the date by the user
	$: (async () => {
		if (selectedDate) {
			await filterFilledSlotsByWashers();
		}
	})();

	async function filterFilledSlotsByWashers() {
		filledSlotsForSelectedDate = await Promise.all(
			filteredWashers.map(async (washer) => {
				const slotsForWasher = await getFilledSlotsForDate(selectedDate);
				const filteredSlots = slotsForWasher.filter((slot) => slot.washerId === washer.id);
				return filteredSlots;
			})
		);
		filledSlotsForSelectedDate = filledSlotsForSelectedDate.flat();
		console.log('filledSlots by date array: ', filledSlotsForSelectedDate);
	}

	//getting the washers in users vicinity
	async function getWashers() {
		let initialWashers = await pb.collection('washers').getFullList();
		const userLoc = JSON.parse(localStorage?.getItem('coords'));

		let filteredWashers2 = initialWashers.filter((washer) => {
			const washerLoc = washer.anchor;
			const distance = getDistance(userLoc.lat, userLoc.lng, washerLoc.lat, washerLoc.lng);
			const radiusKm = 5;
			return distance <= radiusKm;
		});

		return filteredWashers2;
	}

	// Function to fetch filled slots for a specific date (ignoring time)
	async function getFilledSlotsForDate(date) {
		const formattedDate = formatDate2(date); // Extracting date part
		const slots = await pb.collection('filledSlots').getFullList({
			filter: `date >= '${formattedDate} 00:00:00' && date <= '${formattedDate} 23:59:59'`
		});
		return slots;
	}

	onDestroy(() => {
		pb.collection('filledSlots').unsubscribe('*');
	});
</script>

<div class="w-full h-screen flex flex-col">
	<div class="w-full flex items-center justify-between">
		<a href="/services/{id}"><i class="fi fi-rr-arrow-left" /></a>
		<h1 class="text-2xl">{name}</h1>
		<div />
	</div>
	<div>
		<DateSelector bind:selectedDate />
	</div>
	<br />

	<div class="alert flex">
		<span>💸</span>
		<span class="text-sm">You pay after the wash is done </span>
	</div>
	<br /><br />
	<div>
		<h1>Price: {price} for {$currentCarSize}</h1>
		<br />
		<h1>Time: {time.slotTaken} minutes</h1>
	</div>
	<br /><br />
	<div />
	{#if triggerRain}
		<Rain />
		<a href="/"><button on:click={rain} class="btn btn-secondary w-11/12">Go to bookings</button></a
		>
	{:else}
		<button on:click={rain} class="btn btn-secondary w-11/12">Book</button>
	{/if}
</div>
