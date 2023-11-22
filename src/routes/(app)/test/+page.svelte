<script>
	function deleteOverlappingSlotsForWashers(washers, filledSlots, targetWeekday, serviceTime) {
		// Iterate over each washer in the array
		for (let i = 0; i < washers.length; i++) {
			const washer = washers[i];

			// Check if the target weekday exists in the workHours object of the current washer
			if (washer.workHours.hasOwnProperty(targetWeekday)) {
				const targetDay = washer.workHours[targetWeekday];

				// Iterate over the batches (batchOne, batchTwo, etc.) in the target weekday
				for (const batch in targetDay) {
					if (targetDay.hasOwnProperty(batch)) {
						const originalSlots = targetDay[batch];

						// Iterate over the filled slots
						filledSlots.forEach((filledSlot) => {
							// Convert the date in filledSlot to match the format in originalSlots
							const filledSlotStart = filledSlot.slot.start;
							const filledSlotEnd = filledSlot.slot.end;

							// Iterate over the original slots to check for overlap
							for (let j = 0; j < originalSlots.length; j++) {
								const originalSlot = originalSlots[j];

								// Convert the date in originalSlot to match the format in filledSlot
								const originalSlotStart = originalSlot.start;
								const originalSlotEnd = originalSlot.end;

								// Check for overlap
								if (
									(filledSlotStart >= originalSlotStart && filledSlotStart < originalSlotEnd) ||
									(filledSlotEnd > originalSlotStart && filledSlotEnd <= originalSlotEnd) ||
									(filledSlotStart <= originalSlotStart && filledSlotEnd >= originalSlotEnd)
								) {
									// Remove or adjust the overlapping slot
									if (filledSlotStart <= originalSlotStart && filledSlotEnd >= originalSlotEnd) {
										// Filled slot completely covers the original slot, remove the original slot
										originalSlots.splice(j, 1);
										j--; // Adjust the index as we removed an element
									} else if (filledSlotStart <= originalSlotStart) {
										// Filled slot overlaps the start of the original slot
										originalSlot.start = filledSlotEnd;
									} else if (filledSlotEnd >= originalSlotEnd) {
										// Filled slot overlaps the end of the original slot
										originalSlot.end = filledSlotStart;
									} else {
										// Filled slot is within the original slot, split the original slot
										originalSlots.splice(
											j,
											1,
											{ start: originalSlotStart, end: filledSlotStart },
											{ start: filledSlotEnd, end: originalSlotEnd }
										);
										j++; // Adjust the index as we added two elements
									}
								}
							}
						});

						// Filter out slots that cannot accommodate the service time
						targetDay[batch] = originalSlots.filter((slot) => {
							// Assuming service time is in minutes
							const slotDuration =
								(new Date('1970-01-01T' + slot.end + 'Z') -
									new Date('1970-01-01T' + slot.start + 'Z')) /
								(1000 * 60);
							return slotDuration >= serviceTime;
						});
					}
				}
			}
		}

		return washers;
	}

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
		},
		// Washer 2 (additional washer)
		{
			address: 'ganesh peth',
			anchor: { lat: 18.507367, lng: 73.8983946 },
			collectionId: 'wd1zaum2iv7fm5b',
			collectionName: 'washers',
			contact: '9665416321',
			created: '2023-11-10 06:58:24.868Z',
			id: 'h6me4o72czl9uc4',
			name: 'washer2',
			updated: '2023-11-10 07:38:31.225Z',
			userId: 'kpdoxuwtn08ogpu',
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
					batchOne: [{ start: '11:00', end: '13:00' }],
					batchTwo: [{ start: '14:00', end: '15:00' }]
				}
			}
		}
	];

	const filledSlotsArray = [
		// Filled Slot 1 (as provided)
		{
			collectionId: 'kvhryd2fkb3vkvi',
			collectionName: 'filledSlots',
			created: '2023-11-13 02:58:46.715Z',
			date: '2023-11-17 12:00:00.000Z',
			id: 'sefbu5xttf85agz',
			slot: { start: '08:00', end: '09:00' },
			updated: '2023-11-16 03:22:51.626Z',
			washerId: '5i8bjvni9n3m1s9'
		},
		// Filled Slot 2 (additional filled slot)
		{
			collectionId: 'kvhryd2fkb3vkvi',
			collectionName: 'filledSlots',
			created: '2023-11-16 03:23:35.798Z',
			date: '2023-11-17 12:00:00.000Z',
			id: 'tgy8lwpb3tow8s7',
			slot: { start: '11:00', end: '12:00' },
			updated: '2023-11-16 03:23:35.798Z',
			washerId: 'h6me4o72czl9uc4'
		},
		{
			collectionId: 'kvhryd2fkb3vkvi',
			collectionName: 'filledSlots',
			created: '2023-11-16 03:23:35.798Z',
			date: '2023-11-17 12:00:00.000Z',
			id: 'tgy8lwpb3tow8s7',
			slot: { start: '14:00', end: '15:00' },
			updated: '2023-11-16 03:23:35.798Z',
			washerId: 'h6me4o72czl9uc4'
		}
		// ... (other filled slot objects)
	];

	const targetWeekday = 'Saturday';
	const serviceTime = 60; // Assuming service time is 90 minutes

	const editedWashers = deleteOverlappingSlotsForWashers(
		washersArray,
		filledSlotsArray,
		targetWeekday,
		serviceTime
	);
	console.log(editedWashers);
</script>

{#each editedWashers as w (w.id)}
	<p>{JSON.stringify(w)}</p>
{/each}