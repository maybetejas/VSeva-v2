<script>
	import { formatDateForBookings, convertTo12HourFormat2 } from '$lib/utils.js';
	export let data;
</script>

{#each data?.incompleteOrders as order (order.id)}
	<div class="w-full h-1/4 flex justify-between items-center p-2 outline outline-1 rounded-md mt-3">
		<div class="w-1/2 h-full flex flex-col justify-evenly">
			<div>
				<p class="font-semibold">{order.service}</p>
				<p class="">{formatDateForBookings(order.date)}</p>
				<p>{convertTo12HourFormat2(order.slot.start)} - {convertTo12HourFormat2(order.slot.end)}</p>
			</div>
		</div>
		<div class="w-1/2 h-full flex flex-col">
			<button class="btn btn-primary btn-sm ml-auto mr-2">
				<a href="/ordersDetails/incomplete/{order.id}">details</a>
			</button>
		</div>
	</div>
{/each}
