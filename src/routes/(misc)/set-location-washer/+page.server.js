import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PUBLIC_DB_URL } from '$env/static/public'


export const actions = {
    updateLocation: async ({request, locals }) => {
        const formData = await request.formData();
        const address = formData.get('address')
        const anchor = formData.get('newLocation')

        const data = {
            address,
            anchor
        }

        const pb = new PocketBase(PUBLIC_DB_URL)

        try {
            const record = await pb.collection('washers').update(locals?.washer?.id, data);
        } catch (error) {
            console.log("didn't work");
        }
        throw redirect(302, '/washer');
    }
}