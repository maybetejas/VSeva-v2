<script>
	export let data;

	let nam = data?.user?.contact;
	let add = data?.user?.address || 'not logged in';
</script>

<div class="h-screen w-full flex flex-col justify-around">
	<div class="">
		{#if nam}
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
								value={localStorage?.getItem('address')}
								name="contact"
								type="text"
								class="input input-bordered w-full"
							/>
						</label>
					</div>
				</div>
				<form action="?/logout" method="POST" class="mt-4">
					<button class="btn btn-error w-full" type="submit">
						<a class="" href="/logout">logout</a></button
					>
				</form>
			</div>
		{:else}
			<h1 class="text-center text-3xl font-semibold mb-4">Login first</h1>
			<button class="btn btn-primary w-full"><a href="/login">Login</a></button>
		{/if}
	</div>
</div>
