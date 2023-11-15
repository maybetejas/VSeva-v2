<script>
	import { workHours } from '$lib/utils.js';

	export let form;
	export let data;

	console.log(data.ws);

	function toggleDay(day) {
		workHours[day].active = !workHours[day].active;
		workHours[day].workTwoBatches = false;
	}

	let selectedWorkHours;

	function saveWorkHours() {
		selectedWorkHours = {};
		for (const day in workHours) {
			if (workHours[day].active) {
				selectedWorkHours[day] = {
					batchOne: {
						start: workHours[day].batchOne.start,
						end: workHours[day].batchOne.end
					}
				};

				if (workHours[day].workTwoBatches) {
					selectedWorkHours[day].batchTwo = {
						start: workHours[day].batchTwo.start,
						end: workHours[day].batchTwo.end
					};
				}
			} else {
				selectedWorkHours[day] = {};
			}
		}
		console.log(selectedWorkHours);
	}
</script>

{#each Object.keys(workHours) as day}
	<details class="collapse bg-base-200" open={workHours[day].active}>
		<summary class="collapse-title text-xl font-medium">
			<p>{day}</p>
			<input type="checkbox" class="toggle toggle-sm" on:click={() => toggleDay(day)} />
		</summary>
		<div class="collapse-content">
			<label class="cursor-pointer">
				<input
					type="checkbox"
					class="toggle toggle-sm"
					bind:checked={workHours[day].workTwoBatches}
				/>
				Work Second Batch
			</label>
			<p>Select your work hours</p>
			<div class="flex justify-between">
				<p>Batch One Start</p>
				<input type="time" bind:value={workHours[day].batchOne.start} />
			</div>
			<div class="flex justify-between">
				<p>Batch One End</p>
				<input type="time" bind:value={workHours[day].batchOne.end} />
			</div>
			{#if workHours[day].workTwoBatches}
				<p>--break time--</p>
				<div class="flex justify-between">
					<p>Batch Two Start</p>
					<input type="time" bind:value={workHours[day].batchTwo.start} />
				</div>
				<div class="flex justify-between">
					<p>Batch Two End</p>
					<input type="time" bind:value={workHours[day].batchTwo.end} />
				</div>
			{/if}
		</div>
	</details>
{/each}

{#if form?.error}
	<p>something went wrong</p>
{/if}

<form id="workHoursForm" action="?/saveWorkHours" method="post">
	<input value={JSON.stringify(selectedWorkHours)} type="hidden" name="work" />
	<button class="btn btn-primary" on:click={saveWorkHours}>Save</button>
</form>
