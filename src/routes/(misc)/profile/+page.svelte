<script>
	export let data;

	let nam = data?.user?.contact || 'not logged in';
	let add = data?.user?.address || 'not logged in';
</script>

<div class="h-screen w-full flex flex-col justify-around">
	<div>
		<h1 class="text-center text-3xl font-semibold">Profile</h1>
	</div>
	<div class="form-control w-full">
		<div class="w-full">
			<label class="input-group">
				<span>Contact</span>
				<input value={nam} name="contact" type="text" class="input input-bordered w-full" />
			</label>
		</div>
		<div class="w-full mt-4">
			<label class="input-group">
				<span>Address</span>
				<input
					value={localStorage.getItem('address')}
					name="contact"
					type="text"
					class="input input-bordered w-full"
				/>
			</label>
		</div>
	</div>
	<div class="">
		{#if nam}
			<form action="?/logout" method="POST">
				<button class="btn btn-error w-full" type="submit">
					<a class="" href="/logout">logout</a></button
				>
			</form>
		{:else}
			<button class="btn btn-success w-full"><a class="" href="/login">login</a></button>
		{/if}
	</div>
</div>
