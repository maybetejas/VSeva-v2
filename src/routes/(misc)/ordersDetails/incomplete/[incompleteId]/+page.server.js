import PocketBase from 'pocketbase';
import { PUBLIC_DB_URL } from '$env/static/public';

export async function load({ params }) {
    const pb = new PocketBase(PUBLIC_DB_URL);
    const filledSlotId = params.incompleteId;
    const order = await pb.collection('filledSlots').getFirstListItem(`id='${filledSlotId}'`);

    const washerInfo = await pb.collection('washers').getFirstListItem(`id='${order.washerId}'`);

    const washerOrders = await pb.collection('filledSlots').getFullList({
        filter: `washerId='${order.washerId}' && completion=true`,
    });
    const washerOrderCount = washerOrders.length;
    const totalRatings = washerOrders.reduce((sum, order) => sum + order.rating, 0);
    const avgWasherRating = (totalRatings / washerOrders.length).toFixed(1);

    return {
        order,
        washerInfo,
        washerOrders,
        washerOrderCount,
        avgWasherRating,
    }
}