<script>
	import { getUserLocation } from '$lib/utils.js';
	import { onMount } from 'svelte';

	export let data;

	let address = data?.washer?.address || 'Enter address';
	let geoLocError = false;
	let newLocation;

	async function fetchGeolocation() {
		try {
			newLocation = await getUserLocation();
		} catch (error) {
			geoLocError = true;
		}
	}

	onMount(() => {
		fetchGeolocation();
	});
</script>

<main class="w-full flex flex-col items-center mt-20">
	{#if geoLocError}
		☝️ Allow Geolocation Or You won't be able to get orders
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
		<form action="?/updateLocation" method="post">
			<input
				name="address"
				type="text"
				placeholder={address}
				class="input input-bordered input-primary w-full max-w-xs"
			/>
			<input name="newLocation" type="hidden" value={JSON.stringify(newLocation)} />
			<button class="btn btn-base btn-outline w-full mt-2">Set</button>
		</form>
	</div>
</main>
