<script>
	import DateSelector from './../../../../lib/components/DateSelector.svelte';
	import {
		calculatePrice,
		calculateTime,
		currentCarSize,
		deleteOverlappingSlotsForWashers2,
		formatDate2,
		getDistance,
		splitTimeSlots,
		textDateToUTC
	} from './../../../../lib/utils.js';
	import Rain from '$lib/components/Rain.svelte';
	import { servicesList } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { PUBLIC_DB_URL } from '$env/static/public';
	import PocketBase from 'pocketbase';

	//initialising the washers in your area everytime the page first loads or is mounted
	onMount(async () => {
		filteredWashers = await getWashers();
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			if ($currentCarSize === 'compact') {
				const oldCarSize = localStorage?.getItem('carSize');
				if (oldCarSize) {
					currentCarSize.set(oldCarSize);
				}
			}
		}
	});

	const pb = new PocketBase(PUBLIC_DB_URL);
	pb.autoCancellation(false);

	export let data;
	let availableSlots = {};
	let displaySlots = [];
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
	let selectedSlot = {};
	let selectedWasherId = '';
	let selectedWasherContact = '';

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
	$: {
		price = calculatePrice($currentCarSize, name);
	}

	let selectedDate = '';

	///realtime subscribed to the array
	pb.collection('filledSlots').subscribe('*', async (e) => {
		filterFilledSlotsByWashers();
		init(selectedDate);
	});

	//reacting to the changes made in the date by the user
	$: init(selectedDate);

	async function init(selectedDate) {
		await filterFilledSlotsByWashers();
		availableSlots = deleteOverlappingSlotsForWashers2(
			filteredWashers,
			filledSlotsForSelectedDate,
			day,
			time.slotTaken
		);
		displaySlots = splitTimeSlots(availableSlots, day, time.slotTaken);
	}

	async function filterFilledSlotsByWashers() {
		const slotsForWasher = await getFilledSlotsForDate(selectedDate);
		filledSlotsForSelectedDate = filteredWashers.flatMap((washer) =>
			slotsForWasher.filter((slot) => slot.washerId === washer.id)
		);
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

	let showPopup = false;
	let confirmation = false;

	function goToBookings() {
		window.location.href = '/bookings';
	}

	async function placeOrder() {
		const order = {
			slot: selectedSlot,
			userId: data?.user?.id,
			service: name,
			date: textDateToUTC(selectedDate),
			washerId: selectedWasherId,
			location: localStorage?.getItem('coords'),
			userContact: data?.user?.contact,
			washerContact: selectedWasherContact,
			car: localStorage?.getItem('car'),
			carSize: localStorage?.getItem('carSize'),
			address: localStorage?.getItem('address'),
			completion: false
		};

		try {
			const record = await pb.collection('filledSlots').create(order);
			if (record) {
				showPopup = false;
				confirmation = true;
				rain();
			}
			1;
		} catch (error) {
			return error;
		}
	}

	let towingService = null;

	function handleRadioChange(event) {
		towingService = event.target.value;
	}

	let serviceType = null;
	let showServiceCenterSelection = false;

	function handleServiceTypeChange(event) {
		serviceType = event.target.value;

		// Show the service center selection div when "Come to a partner service center" is selected
		showServiceCenterSelection = serviceType === 'partner-center';
	}

	function handleDateSelected(event) {
		selectedDate = event.detail; // Get the selected date from the event
		console.log('Selected Date:', selectedDate);
	}

	function handleWeekdaySelected(event) {
		const selectedWeekday = event.detail;
		console.log('Selected Weekday:', selectedWeekday);
	}

	let serviceCenters = [
		{ id: 'center1', name: 'Service Center 1' },
		{ id: 'center2', name: 'Service Center 2' },
		{ id: 'center3', name: 'Service Center 3' },
		{ id: 'center4', name: 'Service Center 4' },
		{ id: 'center5', name: 'Service Center 5' }
	];

	let selectedServiceCenter = '';

	function handleServiceCenterSelection(event) {
		selectedServiceCenter = event.target.value;
	}

	async function placeOrder2() {
		console.log(price);
		const order2 = {
			service: name,
			location: localStorage?.getItem('coords'),
			price: price,
			userId: data?.user?.id,
			towingService,
			serviceType,
			selectedDate,
			selectedServiceCenter,
			completion: false,
		};

		try {
			const record = await pb.collection('orders').create(order2);
			if (record) {
				confirmation = true;
			}
			1;
		} catch (error) {
			return error;
		}
	}

	onDestroy(() => {
		pb.collection('filledSlots').unsubscribe('*');
	});
</script>

<div class="w-full h-screen flex flex-col justify-between">
	<div class="w-full">
		<div class="mt-20">
			<h1 class="font-bold text-4xl">Checkout</h1>
		</div>
		<div class="divider" />
		<div class="fleex flex-col">
			<div class="mt-12">
				<h1 class="text-3xl font-semibold">{name}</h1>
			</div>
			<div class="mt-4">
				{#if name !== 'Towing' && name !== 'Regular Servicing'}
					<ul>
						{#each services as service}
							<li>{service}</li>
						{/each}
					</ul>
				{:else if name == 'Towing'}
					<div>
						{#each [{ id: 'emergency', label: 'Emergency Towing' }, { id: 'flatbed', label: 'Flatbed Towing' }, { id: 'motorcycle', label: 'Motorcycle Towing' }, { id: 'off-road', label: 'Off-Road Recovery' }, { id: 'winching', label: 'Winching Service' }, { id: 'tire-changes', label: 'Tire Changes' }] as { id, label }}
							<label for={id} class="flex items-center space-x-2">
								<input
									type="radio"
									{id}
									name="towing-service"
									class="radio"
									value={label}
									bind:group={towingService}
									on:change={handleRadioChange}
								/>
								<span>{label}</span>
							</label>
						{/each}
					</div>

					<!-- Display the selected towing service -->
					{#if towingService !== null}
						<div class="mt-4">
							<p>Selected Towing Service: {towingService}</p>
						</div>
					{/if}
				{:else if name == 'Regular Servicing'}
					<div>
						<label for="on-spot" class="flex items-center space-x-2">
							<input
								type="radio"
								id="on-spot"
								name="service-type"
								class="radio"
								value="on-spot"
								bind:group={serviceType}
								on:change={handleServiceTypeChange}
							/>
							<span>On Spot Servicing</span>
						</label>

						<label for="partner-center" class="flex items-center space-x-2">
							<input
								type="radio"
								id="partner-center"
								name="service-type"
								class="radio"
								value="partner-center"
								bind:group={serviceType}
								on:change={handleServiceTypeChange}
							/>
							<span>Come to a Partner Service Center</span>
						</label>
					</div>

					<!-- Display the selected service type -->
					{#if serviceType !== null}
						<div class="mt-4">
							<p>Selected Service Type: {serviceType}</p>
						</div>
					{/if}

					<!-- Show the service center selection div if "Come to a partner service center" is selected -->
					{#if showServiceCenterSelection}
						<div class="mt-4">
							<h1>Select a Date</h1>
							<br />
							<!-- You can add more content here based on your requirements -->
							<DateSelector
								on:dateSelected={handleDateSelected}
								on:weekdaySelected={handleWeekdaySelected}
							/>
							<br />
							<div>
								<h1>Select a Service Center</h1>

								{#each serviceCenters as center}
									<label for={center.id} class="flex items-center space-x-2">
										<input
											type="radio"
											id={center.id}
											name="service-center"
											class="radio"
											value={center.name}
											bind:group={selectedServiceCenter}
											on:change={handleServiceCenterSelection}
										/>
										<span>{center.name}</span>
									</label>
								{/each}
							</div>
						</div>
					{/if}
				{/if}
			</div>
		</div>
		<div class="divider" />
		<div class="mt-12">
			<div class="flex justify-between">
				<div>Price:</div>
				<div>
					<b> {price}</b>
				</div>
			</div>
		</div>
		<div class="mt-4">
			<button class="btn btn-primary w-full" on:click={placeOrder2}>Pay</button>
		</div>
	</div>

	{#if showPopup}
		<div
			on:click={() => {
				showPopup = false;
			}}
			class="w-full h-full backdrop-blur-sm absolute flex flex-col justify-center"
		>
			<div class="card w-96 bg-primary text-primary-content">
				<div class="card-body">
					<h2 class="card-title">{name}</h2>
					<p>Confirm your order 🚗:</p>
					<ul>
						<li>Service: {name} 🧼</li>
						<li>Date and Time: {selectedDate} {selectedSlot} 🕒</li>
						<li>Cancel anytime if the reason is valid ❌</li>
						<li>No additional services outside order 🚫</li>
						<li>Remove valuables before service 💍</li>
						<li>Park car in shade if possible ☂️</li>
					</ul>
					<button class="btn" on:click={placeOrder}>Confirm</button>
				</div>
			</div>
		</div>
	{/if}
	{#if confirmation}
		<div
			on:click={() => {
				confirmation = false;
			}}
			class="w-full h-full backdrop-blur-sm absolute flex flex-col justify-center"
		>
			<div class="card w-96 bg-primary text-primary-content">
				<div class="card-body">
					<h2 class="card-title">{name}</h2>
					<p>Your order has been placed!</p>
					<button class="btn" on:click={goToBookings}>Go to bookings</button>
				</div>
			</div>
		</div>
	{/if}
</div>
