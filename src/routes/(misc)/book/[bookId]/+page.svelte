<script>
	import DateSelector from './../../../../lib/components/DateSelector.svelte';
	import { calculatePrice, currentCarSize } from './../../../../lib/utils.js';
	import Rain from '$lib/components/Rain.svelte';
	import { servicesList } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { Datepicker } from 'svelte-calendar';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			if ($currentCarSize === 'compact') {
				const oldCarSize = localStorage?.getItem('carSize');
				if (oldCarSize) {
					currentCarSize.set(oldCarSize);
				}
			}
		}
	});

	export let date;

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
	</div>
	<br /><br />
	<div class="flex flex-col">
		<h1 class="text-xl">Services</h1>
		<ul class="list-disc ml-4">
			{#each services as service}
				<li>{service}</li>
				<li>{service.time}</li>
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
