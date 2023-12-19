<script>
	import { workHours } from '$lib/utils.js';

	export let form;
	export let data;

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

	function convertBatchesToArray(workHours) {
		for (const day in workHours) {
			if (workHours[day].batchOne) {
				workHours[day].batchOne = workHours[day].batchOne ? [workHours[day].batchOne] : [];
			} else {
				workHours[day].batchOne = [];
			}

			if (workHours[day].batchTwo) {
				workHours[day].batchTwo = workHours[day].batchTwo ? [workHours[day].batchTwo] : [];
			} else {
				workHours[day].batchTwo = [];
			}
		}
		return workHours;
	}
	console.log(selectedWorkHours);
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
<!-- 
<script>
	import { workHours } from '$lib/utils.js';

	export let form;
	export let data;

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
					batchOne: workHours[day].batchOne ? [workHours[day].batchOne] : []
				};

				if (workHours[day].workTwoBatches) {
					selectedWorkHours[day].batchTwo = workHours[day].batchTwo
						? [workHours[day].batchTwo]
						: [];
				}
			} else {
				selectedWorkHours[day] = {};
			}
		}
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
				{#if workHours[day].batchOne && workHours[day].batchOne[0]}
					<input type="time" bind:value={workHours[day].batchOne[0].start} />
				{/if}
			</div>
			<div class="flex justify-between">
				<p>Batch One End</p>
				{#if workHours[day].batchOne && workHours[day].batchOne[0]}
					<input type="time" bind:value={workHours[day].batchOne[0].end} />
				{/if}
			</div>
			{#if workHours[day].workTwoBatches}
				<p>--break time--</p>
				<div class="flex justify-between">
					<p>Batch Two Start</p>
					{#if workHours[day].batchTwo && workHours[day].batchTwo[0]}
						<input type="time" bind:value={workHours[day].batchTwo[0].start} />
					{/if}
				</div>
				<div class="flex justify-between">
					<p>Batch Two End</p>
					{#if workHours[day].batchTwo && workHours[day].batchTwo[0]}
						<input type="time" bind:value={workHours[day].batchTwo[0].end} />
					{/if}
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
</form> -->
