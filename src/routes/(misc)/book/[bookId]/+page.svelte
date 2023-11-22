<script>
	import DateSelector from './../../../../lib/components/DateSelector.svelte';
	import {
		calculatePrice,
		calculateTime,
		currentCarSize,
		deleteOverlappingSlotsForWashers
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
	let initialWashers = []; //intial washers list
	let filteredWashers = []; //filtered list off washers in the users area
	let filledSlotsForSelectedDate = []; //realtime dynamic raray that chnages based on the selectedDate and
	// conatines filled slost for the date for every washer in the
	// filteredWahsers array
	function formatDate(inputDate) {
		// Parse the input date string into a Date object
		const dateObject = new Date(inputDate);

		// Extract year, month, and day components
		const year = dateObject.getFullYear();
		const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
		const day = dateObject.getDate().toString().padStart(2, '0');

		// Format the result as "YYYY-MM-DD"
		const formattedDate = `${year}-${month}-${day}`;

		return formattedDate;
	}

	// Function to fetch filled slots for a specific date (ignoring time)
	async function getFilledSlotsForDate(date) {
		const formattedDate = formatDate(date); // Extracting date part
		const slots = await pb.collection('filledSlots').getFullList({
			filter: `date >= '${formattedDate} 00:00:00' && date <= '${formattedDate} 23:59:59'`
		});
		return slots;
	}

	// Function to filter filled slots based on washers
	async function filterFilledSlotsByWashers() {
		filledSlotsForSelectedDate = await Promise.all(
			filteredWashers.map(async (washer) => {
				const slotsForWasher = await getFilledSlotsForDate(selectedDate);
				const filteredSlots = slotsForWasher.filter((slot) => slot.washerId === washer.id);
				return filteredSlots;
			})
		);
		filledSlotsForSelectedDate = filledSlotsForSelectedDate.flat();
		console.log(filledSlotsForSelectedDate);
	}
	async function fetchData() {
		try {
			await filterFilledSlotsByWashers();
			availableSlots = deleteOverlappingSlotsForWashers(
				filteredWashers,
				filledSlotsForSelectedDate,
				day,
				time.slotTaken
			);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	///realtime subscribed to the array
	pb.collection('filledSlots').subscribe('*', async (e) => {
		fetchData();
	});

	//reacting to the changes made in the date by the user
	$: {
		if (selectedDate) {
			fetchData();
		}
	}

	//getting the washers in users vicinity
	async function getWashers() {
		initialWashers = await pb.collection('washers').getFullList();
		const userLoc = JSON.parse(localStorage?.getItem('coords'));

		filteredWashers = initialWashers.filter((washer) => {
			const washerLoc = washer.anchor;
			const distance = getDistance(userLoc.lat, userLoc.lng, washerLoc.lat, washerLoc.lng);
			const radiusKm = 5;
			return distance <= radiusKm;
		});
	}

	function getDistance(lat1, lon1, lat2, lon2) {
		const R = 6371; // Radius of the earth in km
		const dLat = deg2rad(lat2 - lat1);
		const dLon = deg2rad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c; // Distance in km
		return distance;
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}

	//initialising the washers in your area everytime the page first loads or is mounted
	onMount(async () => {
		getWashers();
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			if ($currentCarSize === 'compact') {
				const oldCarSize = localStorage?.getItem('carSize');
				if (oldCarSize) {
					currentCarSize.set(oldCarSize);
				}
			}
		}
	});

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
	console.log(day);
	console.log(time.slotTaken);
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
		{selectedDate}
		<br />
		{day}
	</div>
	<br />
	<h1>washers</h1>
	{#each filteredWashers as w (w.id)}
		<p>{JSON.stringify(w)}</p>
	{/each}
	<br />
	<h1>slots for that day</h1>
	{#each filledSlotsForSelectedDate as w (w.id)}
		<p>{JSON.stringify(w)}</p>
	{/each}
	<br />
	<h1>availableSlots</h1>
	{#each availableSlots as w (w.id)}
		<p>{JSON.stringify(w)}</p>
	{/each}

	<br />
	<div class="flex flex-col">
		<h1 class="text-xl">Services</h1>
		<ul class="list-disc ml-4">
			{#each services as service}
				<li>{service}</li>
			{/each}
		</ul>
	</div>

	<br /><br />
	<div class="alert flex">
		<span>💸</span>
		<span class="text-sm">You pay after the wash is done </span>
	</div>
	<br /><br />
	<div>
		<h1>Price: {price} for {$currentCarSize}</h1>
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
