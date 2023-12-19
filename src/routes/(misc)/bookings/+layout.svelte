<script>
	import { page } from '$app/stores';
</script>

<section class="h-full w-full mb-8">
	<div class="navbar bg-base-100 text-neutral-content flex justify-evenly pt-4">
		<button class="btn btn-ghost" class:btn-outline={($page.url.pathname.startsWith('/bookings') && !($page.url.pathname === '/bookings/completed'))}
		>
			<a href="/bookings">incomplete</a>
		</button>
		<button class="btn btn-ghost" class:btn-outline={$page.url.pathname === '/bookings/completed'}>
			<a href="/bookings/completed">completed</a>
		</button>
	</div>
	<div class="w-full h-1/2 pt-4">
		<slot />
	</div>
</section>
