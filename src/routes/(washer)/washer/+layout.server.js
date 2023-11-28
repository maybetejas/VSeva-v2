import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals?.user?.washer) {
		throw redirect(302, '/');
	}
};
