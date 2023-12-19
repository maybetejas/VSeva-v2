<script>
	import { formatDateForBookings } from '$lib/utils.js';
	import Stars from '$lib/components/stars.svelte';
	export let data;
	let avgRating = data?.avgWasherRating;
	let orderCount = data?.washerOrderCount;
</script>

<div class="h-full w-11/12 grid grid-flow-row grid-rows-6 gap-2">
	<div class=" h-full w-full">
		<div class=" grid grid-cols-5 h-20">
			<div class="m-1 col-span-1">
				<img src="https://i.pravatar.cc/300" alt="" class="rounded-full" />
			</div>
			<div class="m-1 col-span-4 grid grid-rows-2">
				<div class="">{data?.washerInfo?.name}</div>
				<div class=" grid grid-cols-5">
					<div class=" col-span-1">{orderCount}</div>
					<div class=" col-span-4">
						<Stars {avgRating} />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div>
		<h1 class="text-center text-xl font-bold">Today's order</h1>
	</div>
	{#each data?.incompleteOrders as order (order.id)}
		<div
			class="h-full w-full flex justify-between items-center p-2 outline-dashed outline-1 rounded-sm mt-3"
		>
			<div class="w-1/2 h-full flex flex-col justify-evenly">
				<div>
					<p class="font-semibold">{order.service}</p>
					<p class="">{formatDateForBookings(order.date)}</p>
					<p>{order.slot.start} - {order.slot.end}</p>
				</div>
			</div>
			<div class="w-1/2 h-full flex flex-col">
				<button class="btn btn-outline btn-primary btn-sm ml-auto">
					<a href="/ordersDetails/incomplete/{order.id}">details</a>
				</button>
			</div>
		</div>
	{/each}

	{#if !data?.washer?.workHours}
		<h1>PLease set your wokr hours to get orders</h1>
		<a href="/washer/washer-work-hours">go</a>
	{/if}
	{#if !data?.washer?.address}
		<h1>PLease set your address to get orders</h1>
		<a href="/set-location-washer">go</a>
	{/if}
	{#if !data?.washer?.anchor}
		<h1>PLease set anchor to get orders</h1>
		<a href="/set-location-washer">go</a>
	{/if}
</div>
