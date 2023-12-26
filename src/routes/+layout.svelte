<script>
	import Transition from '$lib/components/Transition.svelte';
	import { page } from '$app/stores';
	import '../app.postcss';
</script>

<main class="min-h-screen flex flex-col">
	<div class="flex-grow">
		<Transition url={$page.url.pathname}>
			<slot />
		</Transition>
	</div>

	<footer class="footer p-8 bg-base-300 text-base-content flex mb-16">
		<!-- <nav>
				<header class="footer-title">Services</header>
				<a class="link link-hover">Branding</a>
				<a class="link link-hover">Design</a>
				<a class="link link-hover">Marketing</a>
				<a class="link link-hover">Advertisement</a>
			</nav> -->
		<nav>
			<header class="footer-title">Company</header>
			<a href="/about" class="link link-hover">About us</a>
			<a href="/contact" class="link link-hover">Contact</a>
			<a href="/jobs" class="link link-hover">Jobs</a>
		</nav>
		<nav>
			<header class="footer-title">Social</header>
			<div class="grid grid-flow-col gap-4">
				<a>
					<svg
						class="fill-primary"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 48 48"
					>
						<path
							d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"
						/>
					</svg>
				</a>

				<a target="_blank" href="https://www.instagram.com"
					><svg
						width="24"
						class="fill-current"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							class="fill-current"
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
						/>
						<path
							class="fill-current"
							d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
						/>
						<path
							class="fill-current"
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
						/>
					</svg>
				</a>
				<a target="_blank" href="https://www.youtube.com"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-current"
						><path
							d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
						/></svg
					></a
				>
			</div>
		</nav>
	</footer>

	<div class="btm-nav btm-nav-md">
		<button class:active={$page.url.pathname === '/'}>
			<a href="/" class="flex flex-col items-center">
				<svg
					width="24"
					
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
						stroke="#1C274C"
						stroke-width="1.5"
						stroke-linecap="round"
					/>
					<path d="M15 18H9" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
				</svg>
				<span class="btm-nav-label"><p class="text-xs">Home</p></span></a
			>
		</button>
		<button
			class:active={$page.url.pathname.startsWith('/bookings') ||
				$page.url.pathname.startsWith('/ordersDetails')}
		>
			<a href="/bookings" class="flex flex-col items-center">
				<svg
					fill="currentColor"
					stroke="currentColor"
					viewBox="0 0 24 24"
					height="22"
					width="22"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M9 2C9.55228 2 10 2.44772 10 3V4H14V3C14 2.44772 14.4477 2 15 2C15.5523 2 16 2.44772 16 3V4H19C20.1046 4 21 4.89543 21 6V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V6C3 4.89543 3.89543 4 5 4H8V3C8 2.44772 8.44772 2 9 2ZM8 6H5V9H19V6H16V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6H10V7C10 7.55228 9.55228 8 9 8C8.44772 8 8 7.55228 8 7V6ZM19 11H5V19H19V11Z"
						fill="currentColor"
					/>
				</svg>
				<span class="btm-nav-label"><p class="text-xs">Bookings</p></span>
			</a>
		</button>
		<button class:active={$page.url.pathname === '/help'}>
			<a href="/help" class="flex flex-col items-center">
				<svg
					stroke="currentColor"
					fill="currentColor"
					viewBox="0 0 24 24"
					height="22"
					width="22"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
						fill="currentColor"
					/>
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M12 14C11.4477 14 11 13.5523 11 13V12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V13C13 13.5523 12.5523 14 12 14Z"
						fill="currentColor"
					/>
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5Z"
						fill="currentColor"
					/>
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M12.3899 7.81137C11.4329 7.7658 10.6304 8.3004 10.4864 9.1644C10.3956 9.70917 9.88037 10.0772 9.3356 9.9864C8.79083 9.8956 8.42281 9.38037 8.51361 8.8356C8.86961 6.69961 10.8171 5.73421 12.4851 5.81363C13.3395 5.85432 14.2176 6.16099 14.8937 6.79278C15.5866 7.44027 16 8.36777 16 9.5C16 10.7913 15.4919 11.7489 14.6172 12.3321C13.8141 12.8675 12.8295 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.6705 11 13.1859 10.8825 13.5078 10.668C13.7581 10.5011 14 10.2087 14 9.5C14 8.88224 13.7884 8.49723 13.5282 8.2541C13.2512 7.99526 12.848 7.83318 12.3899 7.81137Z"
						fill="currentColor"
					/>
				</svg>
				<span class="btm-nav-label"><p class="text-xs">Help</p></span>
			</a>
		</button>
		<button class:active={$page.url.pathname === '/profile'}>
			<a href="/profile" class="flex flex-col items-center">
				<svg
					stroke="currentColor"
					fill="currentColor"
					viewBox="0 0 24 24"
					height="22"
					width="22"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8ZM8 18C6.34315 18 5 19.3431 5 21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21C3 18.2386 5.23858 16 8 16H16C18.7614 16 21 18.2386 21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 19.3431 17.6569 18 16 18H8Z"
						fill="currentColor"
					/>
				</svg>
				<span class="btm-nav-label"><p class="text-xs">Profile</p></span>
			</a>
		</button>
	</div>
</main>
