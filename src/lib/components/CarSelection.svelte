<!-- CarSelection.svelte -->
<script>
	import { carsData } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { currentCar, currentCarSize } from '$lib/utils.js';

	let searchQuery = '';
	let filteredCars = [];
	let carDataSet = null; // Initialize to null

	if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
		if ($currentCar === 'Select Car' && $currentCarSize === 'compact') {
			const oldCar = localStorage?.getItem('car');
			const oldCarSize = localStorage?.getItem('carSize');

			if (oldCar && oldCarSize) {
				currentCar.set(oldCar);
				currentCarSize.set(oldCarSize);
			}
		}
	}

	// Helper function to get the size of a car based on its name
	function getCarSize(carName) {
		if (carDataSet) {
			// Check if carDataSet is available
			for (const size in carDataSet) {
				if (carDataSet[size].includes(carName)) {
					return size;
				}
			}
		}
		return 'Unknown';
	}

	function resetState() {
		searchQuery = '';
		filteredCars = [];
		currentCar.set('Select Car'); // Clear the selected car
		currentCarSize.set('compact'); // Clear the car size
	}

	$: {
		if (searchQuery.length >= 3) {
			if (carDataSet) {
				// Check if carDataSet is available
				const cars = Object.values(carDataSet).flat(); // Flatten the car data
				filteredCars = cars.filter((car) => car.toLowerCase().includes(searchQuery.toLowerCase()));
			} else {
				filteredCars = [];
			}
		} else {
			filteredCars = [];
		}
	}

	let carSelected = false;

	function selectCar(car) {
		currentCar.set(car);
		currentCarSize.set(getCarSize(car));

		// Clear the filteredCars array
		filteredCars = [];

		// Set carSelected to true when a car is selected
		carSelected = true;

		const oldCar = localStorage?.getItem('car');
		const oldCarSize = localStorage?.getItem('carSize');

		if (oldCar !== $currentCar || oldCarSize !== $currentCarSize) {
			localStorage?.setItem('car', $currentCar);
			localStorage?.setItem('carSize', $currentCarSize);
		}
	}
	onMount(async () => {
		carDataSet = $carsData;
	});
</script>

<input
	type="text"
	placeholder={$currentCar}
	bind:value={searchQuery}
	class="input input-sm w-full max-w-xs placeholder-black"
/>

<ul>
	{#if !carDataSet || Object.keys(carDataSet).length === 0}
		<p>Loading car data...</p>
	{:else if filteredCars.length > 0}
		{#each filteredCars as car (car)}
			<li on:click={() => selectCar(car)} key={car}>
				{car}
			</li>
		{/each}
	{:else if searchQuery.length >= 3 && !carSelected && filteredCars.length === 0}
		<p>No matching cars found.</p>
	{/if}
</ul>
