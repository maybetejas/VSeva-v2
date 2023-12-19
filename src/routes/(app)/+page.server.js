import PocketBase from 'pocketbase';
import { PUBLIC_DB_URL } from '$env/static/public';

export const load = async () => {
    
    const pb = new PocketBase(PUBLIC_DB_URL);

    const recordsWithReviewAndRating = await pb.collection('filledSlots').getFullList({
    filter: '(review != null && review != "") && (rating != null && rating != "")',
        sort: '-created',
        expand: 'userId',
    });
  //  console.log(recordsWithReviewAndRating[0].expand.userId.name);

    return {
        recordsWithReviewAndRating,
    }


};
