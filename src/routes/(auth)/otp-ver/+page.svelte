<script>
	import { onMount, onDestroy } from 'svelte';
	import { enhance } from '$app/forms';

	export let form;
	let counter = 0;
	let tries = 3;
	const increment = () => {
		counter++;
		tries--;
	};

	export let data;
</script>

<main class="h-screen w-full flex items-start justify-center">
	<form
		method="POST"
		action="?/otpVerification"
		use:enhance
		class="md:w-1/4 w-11/12 mx-10 flex flex-col items-center md:py-6 py-2 px-4 md:my-20 my-2 rounded-lg outline-accent shadow-lg"
	>
		<!-- ... existing form fields ... -->

		<div class="form-control w-full max-w-md">
			<label class="label">
				<span class="label-text">OTP</span>
				<span class="label-text">{tries} remaining</span>
			</label>
			<input
				type="text"
				inputmode="numeric"
				name="otpString"
				required
				class="input input-bordered h-12 text-center"
			/>
		</div>

		{#if counter >= 3}
			<input type="hidden" value="exceeded" name="tries" />
		{/if}
		{#if form?.x}
			<span>Invalid otp</span>
		{/if}

		<div class="form-control w-full max-w-md flex justify-evenly py-4">
			<button on:click={increment} type="submit" class="btn btn-secondary mt-4">Submit OTP</button>
		</div>
	</form>
</main>
