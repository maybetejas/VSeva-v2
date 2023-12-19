<script>
	import { page } from '$app/stores';
	import { formatDateForBookings } from '$lib/utils.js';
	export let data;
</script>

<div class="h-screen w-11/12">
	{#each data?.incompleteOrders as order (order.id)}
		<div
			class="w-full h-1/4 flex justify-between items-center p-2 outline-dashed outline-1 rounded-sm mt-3"
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
</div>
