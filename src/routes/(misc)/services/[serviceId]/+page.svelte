<script>
	import { calculatePrice, calculateTime, currentCarSize } from './../../../../lib/utils.js';
	import { servicesList } from '$lib/utils.js';
	import YTplayer from '$lib/components/YTplayer.svelte';
	import { page } from '$app/stores';
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

	export let data;

	const id = $page.params.serviceId;

	const selectedService = servicesList.find((service) => service.id === parseInt(id));

	let name = '';
	let link = '';
	let services = [];
	let price = 0;
	$: price = calculatePrice($currentCarSize, name);
	if (selectedService) {
		name = selectedService.name;
		link = selectedService.link;
		services = selectedService.services;
	}
	const time = calculateTime($currentCarSize, name);
	console.log(name);
</script>

<div class="w-full h-full flex flex-col">
	<div class="w-full flex justify-center mt-2">
		<h1 class="text-2xl font-semibold">{name}</h1>
	</div>

	<div class="w-full mt-8">
		<YTplayer {link} />
	</div>

	<div class="flex flex-col mt-4">
		<h1 class="text-xl font-semibold">{name}</h1>
		<ul class="mt-2">
			<li>🏠 On subscriptions</li>
			<li>🤚 Convenient</li>
			<li>💸 {price}</li>
		</ul>
	</div>

	<div class="flex flex-col mt-4">
		<h1 class="text-xl font-semibold">Services</h1>
		<ul class="mt-2">
			{#each services as service}
				<li>- {service}</li>
			{/each}
		</ul>
	</div>

	<div class="mt-36 mb-8">
		{#if data?.user}
			<a href="/book/{id}"><button class="btn w-full btn-primary w-11/12">Book</button></a>
		{:else}
			<a href="/login"><button class="btn btn-primary w-full">Login to book</button></a>
		{/if}
	</div>
</div>
