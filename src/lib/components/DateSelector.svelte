<script>
	import { createEventDispatcher } from 'svelte';
	import { formatDate } from '../utils';

	export let selectedDate = '';
	let currentDate = new Date();
	let nextDates = [];

	const dispatch = createEventDispatcher();

	for (let i = 0; i < 5; i++) {
		nextDates.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}

	function handleDateSelection(date) {
		selectedDate = date;
		dispatch('dateSelected', selectedDate); // Emit the selected date
		dispatch('weekdaySelected', date.toLocaleString('default', { weekday: 'short' }));
	}
</script>

<div class="text-center">
	<!-- Other content -->

	<div class="flex w-11/12 items-center">
		{#each nextDates as date}
			<button
				class="btn btn-sm {selectedDate === date ? 'btn-accent btn-outline' : 'btn-ghost'} flex"
				on:click={() => handleDateSelection(date)}
			>
				<p class="text-sm">{date.getDate()}</p>
				<p class="text-sm">{date.toLocaleString('default', { weekday: 'short' })}</p>
			</button>
		{/each}
	</div>
</div>
