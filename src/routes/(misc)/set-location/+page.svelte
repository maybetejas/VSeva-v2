<script>
	import { currentCoords, currentLocation } from './../../../lib/utils.js';
	import { getUserLocation } from '$lib/utils.js';
	import { onMount } from 'svelte';

	let address = '';
	let geoLocError = false;

	// Function to update the currentCoords store
	function updateCurrentCoords(coords) {
		currentCoords.set(coords);
		localStorage?.setItem('coords', JSON.stringify(coords));
	}

	if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
		const oldCoordsStr = localStorage?.getItem('coords');
		if (oldCoordsStr) {
			const oldCoords = JSON.parse(oldCoordsStr);
			updateCurrentCoords(oldCoords);
		}

		// Retrieve the address from localStorage
		const oldLocation = localStorage?.getItem('address');
		if (oldLocation) {
			address = oldLocation;
		}
	}

	async function fetchGeolocation() {
		try {
			const newLocation = await getUserLocation();
			updateCurrentCoords(newLocation);
		} catch (error) {
			geoLocError = true;
		}
	}

	onMount(() => {
		fetchGeolocation();
	});

	function setLocation() {
		localStorage?.setItem('address', address);
		window.location.href = '/';
	}
</script>

<main class="w-full flex flex-col items-center mt-20">
	{#if geoLocError}
		☝️ Allow Geolocation To Accurate Address And Refresh
		<br />
		Don't know how to? watch this video -
		<button class="btn btn-outline btn-seconddary"
			><a
				data-sveltekit-reload
				href="https://youtu.be/LM6lWvkIVVw?si=PC80lF0t7DXGZ9j2"
				target="_blank">enable geolocation</a
			></button
		>
	{/if}

	<div>
		<input
			type="text"
			bind:value={address}
			placeholder={$currentLocation}
			class="input input-bordered input-primary w-full max-w-xs"
		/>
		<button on:click={setLocation} class="btn btn-base btn-outline w-full mt-2">Set</button>
	</div>
</main>
