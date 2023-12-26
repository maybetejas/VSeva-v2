<script>
	import { servicesList, toCamelCase } from './../utils.js';
	export let reviews = [];

	// Function to get the service link based on the service name
	const getServiceLink = (serviceName) => {
		const service = servicesList.find((s) => s.name === serviceName);
		return service ? `/services/${service.id}` : '';
	};

	// Function to truncate text after a certain number of words
	const truncateWords = (text, numWords) => {
		const words = text.split(' ');
		return words.length > numWords ? words.slice(0, numWords).join(' ') + '...' : text;
	};
</script>
<h1 class="text-xl font-semibold">Reviews</h1>
<div class="w-full carousel rounded-box shadow-lg">
	{#each reviews as s (s.id)}
		<div class="carousel-item w-full">
			<div class="card w-86 bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">
						<div class="w-full flex">
							<h1 class="font-bold text-xl">{s.expand.userId.name}</h1>
							<div class="flex ml-4 mt-1">
								{#each Array(s.rating) as _, i}
									<svg
										width="25px"
										viewBox="0 0 50 50"
										class="fill-accent"
										fill="#000000"
										version="1.1"
										id="Capa_1"
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										xml:space="preserve"
									>
										<g>
											<path
												d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
							   s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
							   l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
							   c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
							   l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z M25.336,21.598c-0.268,0.24-0.387,0.605-0.311,0.957
							   l2.097,9.695l-8.574-4.99c-0.311-0.182-0.695-0.182-1.006,0l-8.576,4.99l2.097-9.695c0.076-0.352-0.043-0.717-0.311-0.957
							   l-7.396-6.613l9.87-1.002c0.358-0.035,0.668-0.264,0.814-0.592l4.004-9.077l4.003,9.077c0.146,0.328,0.456,0.557,0.814,0.592
							   l9.87,1.002L25.336,21.598z"
											/>
										</g>
									</svg>
								{/each}
							</div>
						</div>
					</h2>
					<h2>{s.service}</h2>
					<!-- Apply 'truncate' class to truncate long reviews with ellipsis -->
					<p>{truncateWords(s.review, 20)}</p>
					<div class="card-actions justify-end">
						<button class="btn btn-sm btn-secondary"><a href={getServiceLink(s.service)}>Book</a></button>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
