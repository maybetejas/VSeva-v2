<!-- <script>
	let workHours = {
		Monday: { start: '09:00', end: '17:00', active: true },
		Tuesday: { start: '09:00', end: '17:00', active: true },
		Wednesday: { start: '09:00', end: '17:00', active: true },
		Thursday: { start: '09:00', end: '17:00', active: true },
		Friday: { start: '09:00', end: '17:00', active: true },
		Saturday: { start: '09:00', end: '12:00', active: true },
		Sunday: { start: '09:00', end: '12:00', active: true }
	};

	function toggleDay(day) {
		workHours[day].active = !workHours[day].active;
	}

	function saveWorkHours() {
		const selectedWorkHours = {};
		for (const day in workHours) {
			if (workHours[day].active) {
				selectedWorkHours[day] = {
					start: workHours[day].start,
					end: workHours[day].end
				};
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
			<div class="flex justify-between">
				<p>Start</p>
				<input type="time" bind:value={workHours[day].start} />
			</div>
			<div class="flex justify-between">
				<p>End</p>
				<input type="time" bind:value={workHours[day].end} />
			</div>
		</div>
	</details>
{/each}

<button class="btn btn-primary" on:click={saveWorkHours}>Save</button> -->

<script>
	let workHours = {
		Monday: { start: '09:00', end: '17:00', active: false },
		Tuesday: { start: '09:00', end: '17:00', active: false },
		Wednesday: { start: '09:00', end: '17:00', active: false },
		Thursday: { start: '09:00', end: '17:00', active: false },
		Friday: { start: '09:00', end: '17:00', active: false },
		Saturday: { start: '09:00', end: '12:00', active: false },
		Sunday: { start: '09:00', end: '12:00', active: false }
	};

	function toggleDay(day) {
		workHours[day].active = !workHours[day].active;
	}

	function saveWorkHours() {
		const selectedWorkHours = {};
		for (const day in workHours) {
			if (workHours[day].active) {
				selectedWorkHours[day] = {
					start: workHours[day].start,
					end: workHours[day].end
				};
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
			<div class="flex justify-between">
				<p>Start</p>
				<input type="time" bind:value={workHours[day].start} />
			</div>
			<div class="flex justify-between">
				<p>End</p>
				<input type="time" bind:value={workHours[day].end} />
			</div>
		</div>
	</details>
{/each}

<button class="btn btn-primary" on:click={saveWorkHours}>Save</button>
