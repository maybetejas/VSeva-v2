<script>
	import { formatDateForBookings, convertTo12HourFormat2 } from '$lib/utils.js';
	export let data;

	function cnt(inputDate) {
		const date = new Date(inputDate);
		const day = date.getDate();
		const weekday = date.toLocaleString('default', { weekday: 'long' });

		const daySuffix =
			day % 10 === 1 && day !== 11
				? 'st'
				: day % 10 === 2 && day !== 12
				? 'nd'
				: day % 10 === 3 && day !== 13
				? 'rd'
				: 'th';

		return `${day}${daySuffix} ${weekday}`;
	}
</script>

{#each data?.completeOrders as order (order.id)}
	<div class="w-full h-1/4 flex justify-between items-center p-2 outline outline-1 rounded-md mt-3">
		<div class="w-1/2 h-full flex flex-col justify-evenl">
			<div>
				<p class="font-semibold">{order.service}</p>
				<p>{cnt(order.selectedDate)}</p>
				<p class="">{order.price}</p>
			</div>
		</div>
	</div>
{/each}
