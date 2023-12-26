import PocketBase from 'pocketbase';
import { PUBLIC_DB_URL } from '$env/static/public';

export const load = async ({ locals }) => {

    const pb = new PocketBase(PUBLIC_DB_URL);

    const incompleteOrders = await pb.collection('orders').getFullList({
        filter: `userId='${locals?.user?.id}' && completion=false`,
        sort: '-created',  // You can adjust the sorting based on your requirements
    });

    const completeOrders = await pb.collection('orders').getFullList({
        filter: `userId='${locals?.user?.id}' && completion=true`,
        sort: '-created',  // You can adjust the sorting based on your requirements
    });
    
    return {
        incompleteOrders,
        completeOrders
    }

};
