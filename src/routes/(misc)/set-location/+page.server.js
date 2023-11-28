import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

import { PUBLIC_DB_URL } from '$env/static/public';

export const actions = {
	updateLocation: async ({ request, locals }) => {
		const formData = await request.formData();
		const address = formData.get('address');
		const car = formData.get('car');
		const lat = formData.get('lat');
		const lng = formData.get('lng');
		console.log(lat);
		console.log(lng);

		const data = {
			address,
			car,
			location: {
				lat,
				lng
			}
		};

		const pb = new PocketBase(PUBLIC_DB_URL);

		try {
			const record = await pb.collection('users').update(locals?.user?.id, data);
		} catch (error) {
			return {
				x: true
			};
		}
		throw redirect(302, '/');
	}
};
