import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PUBLIC_DB_URL } from '$env/static/public';


export const load = async ({ locals }) => {
	if (!locals?.user?.washer) {
		throw redirect(302, '/');
	}

	const pb = new PocketBase(PUBLIC_DB_URL);

	const washerId = locals?.washer?.id;

    const washerInfo = await pb.collection('washers').getFirstListItem(`id='${washerId}'`);

    const washerOrders = await pb.collection('filledSlots').getFullList({
        filter: `washerId='${washerId}' && completion=true`,
	});
	
    const washerOrderCount = washerOrders.length;
    const totalRatings = washerOrders.reduce((sum, order) => sum + order.rating, 0);
    const avgWasherRating = (totalRatings / washerOrders.length).toFixed(1);


    const incompleteOrders = await pb.collection('filledSlots').getFullList({
        filter: `userId='${locals?.user?.id}' && completion=false`,
        sort: '-created',  // You can adjust the sorting based on your requirements
    });

    const completeOrders = await pb.collection('filledSlots').getFullList({
        filter: `userId='${locals?.user?.id}' && completion=true`,
        sort: '-created',  // You can adjust the sorting based on your requirements
	});
	
    
    return {
        incompleteOrders,
		completeOrders,
		washerInfo,
        washerOrders,
        washerOrderCount,
        avgWasherRating,
    }
};
