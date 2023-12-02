<script>
	import { deleteOverlappingSlotsForWashers2 } from '$lib/utils';
	import { deleteOverlappingSlotsForWashers } from '../../../lib/utils';
	// Example usage:
	const washersArray = [
		// Washer 1 (as provided)
		{
			address: 'rasta peth',
			anchor: { lat: 18.507367, lng: 73.8983946 },
			collectionId: 'wd1zaum2iv7fm5b',
			collectionName: 'washers',
			contact: '9325581756',
			created: '2023-11-09 18:16:56.255Z',
			id: '5i8bjvni9n3m1s9',
			name: 'tejas',
			updated: '2023-11-16 07:10:21.669Z',
			userId: 'iqs8bnmqloc0py6',
			workHours: {
				Monday: {
					batchOne: [{ start: '08:00', end: '13:00' }],
					batchTwo: [{ start: '14:00', end: '15:00' }]
				},
				Tuesday: {
					batchOne: [{ start: '08:00', end: '13:00' }],
					batchTwo: [{ start: '14:00', end: '15:00' }]
				},
				Wednesday: {
					batchOne: [{ start: '08:00', end: '13:00' }],
					batchTwo: [{ start: '14:00', end: '15:00' }]
				},
				Thursday: {
					batchOne: [{ start: '08:00', end: '13:00' }],
					batchTwo: [{ start: '14:00', end: '15:00' }]
				},
				Friday: {
					batchOne: [{ start: '08:00', end: '13:00' }],
					batchTwo: [{ start: '14:00', end: '15:00' }]
				},
				Saturday: {
					batchOne: [{ start: '08:00', end: '13:00' }],
					batchTwo: [{ start: '14:00', end: '15:00' }]
				},
				Sunday: {
					batchOne: [{ start: '08:00', end: '13:00' }],
					batchTwo: [{ start: '14:00', end: '15:00' }]
				}
			}
		}
		// {
		// 	address: 'rasta peth',
		// 	anchor: { lat: 18.507367, lng: 73.8983946 },
		// 	collectionId: 'wd1zaum2iv7fm5b',
		// 	collectionName: 'washers',
		// 	contact: '9325581756',
		// 	created: '2023-11-09 18:16:56.255Z',
		// 	id: '6i8bjvni9n3m1s9',
		// 	name: 'tejas',
		// 	updated: '2023-11-16 07:10:21.669Z',
		// 	userId: 'oqs8bnmqloc0py6',
		// 	workHours: {
		// 		Monday: {
		// 			batchOne: [{ start: '08:00', end: '13:00' }],
		// 			batchTwo: [{ start: '14:00', end: '15:00' }]
		// 		},
		// 		Tuesday: {
		// 			batchOne: [{ start: '08:00', end: '13:00' }],
		// 			batchTwo: [{ start: '14:00', end: '15:00' }]
		// 		},
		// 		Wednesday: {
		// 			batchOne: [{ start: '08:00', end: '13:00' }],
		// 			batchTwo: [{ start: '14:00', end: '15:00' }]
		// 		},
		// 		Thursday: {
		// 			batchOne: [{ start: '08:00', end: '13:00' }],
		// 			batchTwo: [{ start: '14:00', end: '15:00' }]
		// 		},
		// 		Friday: {
		// 			batchOne: [{ start: '08:00', end: '13:00' }],
		// 			batchTwo: [{ start: '14:00', end: '15:00' }]
		// 		},
		// 		Saturday: {
		// 			batchOne: [{ start: '08:00', end: '13:00' }],
		// 			batchTwo: [{ start: '14:00', end: '15:00' }]
		// 		},
		// 		Sunday: {
		// 			batchOne: [{ start: '08:00', end: '13:00' }],
		// 			batchTwo: [{ start: '14:00', end: '15:00' }]
		// 		}
		// 	}
		// }
	];

	const filledSlotsArray = [
		// Filled Slot 1 (as provided)
		{
			collectionId: 'kvhryd2fkb3vkvi',
			collectionName: 'filledSlots',
			created: '2023-11-13 02:58:46.715Z',
			date: '2023-11-17 12:00:00.000Z',
			id: 'sefbu5xttf85agp',
			slot: { start: '11:00', end: '12:00' },
			updated: '2023-11-16 03:22:51.626Z',
			washerId: '5i8bjvni9n3m1s9'
		},
		{
			collectionId: 'kvhryd2fkb3vkvi',
			collectionName: 'filledSlots',
			created: '2023-11-13 02:58:46.715Z',
			date: '2023-11-17 12:00:00.000Z',
			id: 'sefbu5xttf85agz',
			slot: { start: '08:00', end: '09:00' },
			updated: '2023-11-16 03:22:51.626Z',
			washerId: '5i8bjvni9n3m1s9'
		}
	];

	const targetWeekday = 'Thursday';
	const serviceTime = 180; // Assuming service time is 90 minutess

	const editedWashers = deleteOverlappingSlotsForWashers2(
		washersArray,
		filledSlotsArray,
		targetWeekday,
		serviceTime
	);

	console.log('edited slots: ', editedWashers);

	function splitTimeSlots(workers, targetWeekday, serviceTimeInMinutes) {
		const result = [];

		workers.forEach((worker) => {
			const workerId = worker.id;
			const workerWorkHours = worker.workHours[targetWeekday];

			if (workerWorkHours) {
				Object.keys(workerWorkHours).forEach((batchKey) => {
					const batch = workerWorkHours[batchKey];

					batch.forEach((timeRange) => {
						const { start, end } = timeRange;
						const startTime = new Date(`2023-01-01T${start}`);
						const endTime = new Date(`2023-01-01T${end}`);

						while (startTime.getTime() + serviceTimeInMinutes * 60 * 1000 <= endTime.getTime()) {
							const slotEnd = new Date(startTime.getTime() + serviceTimeInMinutes * 60 * 1000);
							result.push({
								id: workerId,
								slot: {
									start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
									end: slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
								}
							});
							startTime.setTime(slotEnd.getTime());
						}
					});
				});
			}
		});

		return result;
	}

	const availableSlots = splitTimeSlots(editedWashers, targetWeekday, serviceTime);
	console.log(availableSlots);
</script>
