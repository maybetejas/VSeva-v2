<script>
	export let apiKey = '18fb3acfbcee4980731b8c27da612226';

	import { onMount } from 'svelte';

	let map;

	onMount(() => {
		// Load MapmyIndia scripts dynamically
		const mapLoadScript = document.createElement('script');
		mapLoadScript.src = `https://apis.mapmyindia.com/advancedmaps/v1/${apiKey}/map_load?v=1.5`;
		mapLoadScript.async = true;
		document.head.appendChild(mapLoadScript);

		const mapSdkPluginsScript = document.createElement('script');
		mapSdkPluginsScript.src = `https://apis.mapmyindia.com/advancedmaps/api/${apiKey}/map_sdk_plugins`;
		mapSdkPluginsScript.async = true;
		document.head.appendChild(mapSdkPluginsScript);

		// Map Initialization
		mapLoadScript.onload = mapSdkPluginsScript.onload = () => {
			map = new MapmyIndia.Map('map', {
				center: [28.09, 78.3],
				zoom: 5,
				search: false,
				publicapiKey: apiKey
			});

			// Nearby plugin initialization
			const options = {
				divId: 'nearby_search',
				map: map,
				keywords: 'atm',
				refLocation: [28.632735, 77.219696],
				fitbounds: true,
				click_callback: (d) => alert(d)
			};

			const nr = MapmyIndia.nearby(options);
		};
	});
</script>

<div id="map" />

<style>
	#map {
		width: 99%;
		height: 400px;
		margin: 0;
		padding: 0;
	}

	#nearby_search {
		background-color: red;
		margin: 5px;
		width: 99%;
		height: 250px;
		overflow-y: auto;
		border-radius: 10px;
	}
</style>
