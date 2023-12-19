<script>
	export let data;
</script>

<main class="h-screen w-full flex flex-col items-center">
	<div class="navbar bg-base-100">
		<div class="flex-none">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/></svg
					>
				</label>
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					{#if data?.washer}
						<li><a href="/washer/washer-bookings">washer orders</a></li>
						<li><a href="/washer/washer-profile">washer profile</a></li>
						<li><a href="/washer/washer-work-hours">washer workhours</a></li>
					{/if}
				</ul>
			</div>
		</div>
		<div class="flex-1" />
		<div class="flex-none">
			<a href="/set-location-washer">
				{#if data?.washer?.address}
					{data?.washer?.address}
				{:else}
					Set Location
				{/if}
				<button class="btn btn-square btn-ghost">
					<i class="fi fi-rr-marker" />
				</button></a
			>
		</div>
	</div>
	<slot />
</main>
