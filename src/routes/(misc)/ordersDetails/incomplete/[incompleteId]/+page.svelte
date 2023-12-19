<script>
	import { formatDateForBookings, getServicesArray, convertTo12HourFormat } from '$lib/utils.js';
	import Stars from '$lib/components/stars.svelte';
	import { calculatePrice } from '$lib/utils.js';
	import PocketBase from 'pocketbase';
	import { PUBLIC_DB_URL } from '$env/static/public';
	export let data;
	let services = getServicesArray(data?.order?.service);
	const avgRating = data?.avgWasherRating;

	async function deleteOrder() {
		const pb = new PocketBase(PUBLIC_DB_URL);

		try {
			const record = await pb.collection('filledSlots').delete(data?.order?.id);
			if (record) {
				window.location.href = '/bookings';
			}
		} catch (error) {
			return { error };
		}
	}
</script>

<div class="h-screen">
	<div class=" w-full h-full mt-4">
		<div class=" grid grid-cols-5 h-20">
			<div class="m-1 col-span-1">
				<img src="https://i.pravatar.cc/300" alt="" class="rounded-full" />
			</div>
			<div class="m-1 col-span-4 grid grid-rows-2">
				<div class="">{data?.washerInfo?.name}</div>
				<div class=" grid grid-cols-5">
					<div class=" col-span-1">{data?.washerOrderCount}</div>
					<div class=" col-span-4">
						<Stars {avgRating} />
					</div>
				</div>
			</div>
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
					<!-- Open the modal using ID.showModal() method -->
					<button class="btn" onclick="my_modal_1.showModal()">CANCEL</button>
					<dialog id="my_modal_1" class="modal">
						<div class="modal-box">
							<h3 class="font-bold text-lg">Cancel {data?.order?.service}</h3>
							<p class="py-4">This action will cancel the order, do you wish to proceed?</p>
							<div class="modal-action">
								<form method="dialog">
									<!-- if there is a button in form, it will close the modal -->
									<button class="btn btn-error" on:click={deleteOrder}>Confirm</button>
								</form>
							</div>
						</div>
					</dialog>
				</div>
			</div>
		</div>
	</div>
</div>
