<script>
	import { formatDateForBookings, getServicesArray, convertTo12HourFormat } from '$lib/utils.js';
	import { calculatePrice } from '$lib/utils.js';
	import PocketBase from 'pocketbase';
	import { PUBLIC_DB_URL } from '$env/static/public';
	export let data;
	let services = getServicesArray(data?.order?.service);
	let selectedRating = 1;
	let review = '';
	let reviewSubmitted = false;

	function toggleReviewSubmitted() {
		reviewSubmitted != reviewSubmitted;
	}

	function handleStarClick(value) {
		selectedRating = value;
	}

	async function submitReview() {
		const pb = new PocketBase(PUBLIC_DB_URL);

		const data1 = {
			rating: selectedRating,
			review
		};

		try {
			const record = await pb.collection('filledSlots').update(data?.order?.id, data1);
			if (record) {
				reviewSubmitted = true;
			}
		} catch (error) {
			return { error };
		}
	}
</script>

<div class="h-screen">
	<div class=" w-full h-full mt-4">
		<div class=" h-20 flex items-center justify-center">
			<h1 class="text-xl font-bold text-primary">COMPLETED</h1>
		</div>

		<div class=" h-1/2 m-1 grid grid-rows-5">
			<div class="row-span-1 grid grid-cols-2">
				<div class="">{data?.order?.service}</div>
				<div class="">
					{formatDateForBookings(data?.order?.date)}
					{convertTo12HourFormat(data?.order?.slot?.start)}
				</div>
			</div>
			<div class="row-span-3 grid grid-rows-6">
				<div class="row-span-1">
					<h2 class="text-xl">Services</h2>
				</div>
				<div class="row-span-5">
					<ul>
						{#each services as s}
							<p>{s}</p>
						{/each}
					</ul>
				</div>
			</div>

			<div class="row-span-1 grid grid-cols-2">
				<div class="">{calculatePrice(data?.order?.carSize, data?.order?.service)}</div>
				<div class="">
					<!-- Open the modal using ID.showModal() method -->
					<button class="btn" onclick="my_modal_1.showModal()">leave a review</button>
					<dialog id="my_modal_1" class="modal">
						<div class="modal-box">
							{#if !reviewSubmitted}
								<h3 class="font-bold text-lg">How was your experience?</h3>
								<div class="flex flex-col">
									<div class="rating">
										<input
											type="radio"
											name="rating-2"
											class="mask mask-star-2 bg-orange-400"
											checked={selectedRating === 1}
											on:click={() => handleStarClick(1)}
										/>
										<input
											type="radio"
											name="rating-2"
											class="mask mask-star-2 bg-orange-400"
											checked={selectedRating === 2}
											on:click={() => handleStarClick(2)}
										/>
										<input
											type="radio"
											name="rating-2"
											class="mask mask-star-2 bg-orange-400"
											checked={selectedRating === 3}
											on:click={() => handleStarClick(3)}
										/>
										<input
											type="radio"
											name="rating-2"
											class="mask mask-star-2 bg-orange-400"
											checked={selectedRating === 4}
											on:click={() => handleStarClick(4)}
										/>
										<input
											type="radio"
											name="rating-2"
											class="mask mask-star-2 bg-orange-400"
											checked={selectedRating === 5}
											on:click={() => handleStarClick(5)}
										/>
									</div>
									<textarea
										bind:value={review}
										class="textarea textarea-bordered"
										placeholder="Leave a review, it helps us get better 😅"
									/>
								</div>
								<button on:click={submitReview} class="btn btn-secondary">submit</button>
							{:else}
								<h1>Thanksfor submitting your review!🙂</h1>
							{/if}
							<div class="modal-action">
								<form method="dialog">
									<button class="btn">Close</button>
								</form>
							</div>
						</div>
					</dialog>
				</div>
			</div>
		</div>
	</div>
</div>
