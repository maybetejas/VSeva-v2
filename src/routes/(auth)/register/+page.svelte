<script>
	import { isValidContact } from '$lib/utils.js';

	export let form;

	let address = '';
	let contact = '';
	let car = 'Select a car';
	let contactValid = false;

	$: {
		contactValid = isValidContact(contact);
	}

	function selectCar(option) {
		car = option;
	}
</script>

<main class="w-full flex flex-col items-center mt-20">
	{#if form?.exists}
		<h1>contact already in use <a class="underline" href="/login">login</a> instead</h1>
	{/if}
	<form action="?/getOtp" method="POST" class="mt-10">
		<div class="form-control w-full">
			<div class="w-full">
				<label class="label">
					<span class="label-text">Enter full address</span>
				</label>
				<label class="input-group">
					<span>Address</span>
					<input
						bind:value={address}
						name="address"
						type="text"
						class="input input-bordered w-full"
					/>
				</label>
			</div>
			<!-- <div class="w-full fleex flex-col">
				<details class="dropdown mb-32">
					<summary class="m-1 btn">{car}</summary>
					<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
						<li>
							<a on:click={() => selectCar('hatchback')}>Hatchback (Swift, Wagonr)</a>
						</li>
						<li><a on:click={() => selectCar('sedan')}>Sedan (City, Civic)</a></li>
						<li>
							<a on:click={() => selectCar('suv')}>SUV (Fortuner, Innova)</a>
						</li>
					</ul>
				</details>
				<input type="hidden" name="car" bind:value={car} />
			</div> -->
			<div class="w-full">
				<label class="label">
					<span class="label-text">Contact</span>
				</label>
				<label class="input-group">
					<span>Contact</span>
					<input
						bind:value={contact}
						name="contact"
						placeholder="1234567891"
						type="text"
						class="input input-bordered w-full"
					/>
				</label>

				{#if contact !== ''}
					<span class={contactValid ? 'text-green-500' : 'text-red-500'}>
						{contactValid ? 'Valid Contact' : 'Invalid Contact'}
					</span>
				{/if}
			</div>
			<button class="btn btn-primary w-full mt-4" type="submit">Get OTP</button>
		</div>
	</form>
</main>
