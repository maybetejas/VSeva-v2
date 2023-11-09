<script>
	import { isValidContact } from '$lib/utils.js';

	export let form;

	let contact = '';
	let contactValid = false;

	$: {
		contactValid = isValidContact(contact);
	}
</script>

<main class="w-full flex flex-col items-center mt-20">
	{#if form?.x}
		<h1>User doesn't exist <a href="/register" class="underline">register</a> first</h1>
	{/if}
	<form action="?/login" method="POST" class="mt-10">
		<div class="form-control w-full">
			<div class="w-full">
				<label class="label">
					<span class="label-text">Contact</span>
				</label>
				<label class="input-group">
					<span>Contact</span>
					<input
						bind:value={contact}
						name="contact"
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
			<button class="btn btn-primary w-full mt-4" type="submit">Get otp</button>
			<span class="mt-4"
				>If you're a new user, <a href="/register" class="underline"><b>REGISTER</b></a> instead</span
			>
		</div>
	</form>
</main>
