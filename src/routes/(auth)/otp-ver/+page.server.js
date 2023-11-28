import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PUBLIC_DB_URL } from '$env/static/public';

export const load = async ({ cookies }) => {};

export const actions = {
	otpVerification: async ({ request, cookies }) => {
		const formData = await request.formData();
		const otpString = formData.get('otpString');
		const contact = cookies.get('verification');
		let otp = '0000';

		const pb = new PocketBase(PUBLIC_DB_URL);
		const record = await pb.collection('users').getFirstListItem(`contact="${contact}"`);
		if (record) {
			otp = record.otp;
			if (otpString === otp) {
				cookies.set('verification', '', {
					path: '/',
					expires: new Date(0)
				});

				//login the user
				const newToken = crypto.randomUUID();
				const data = {
					userAuthToken: newToken
				};

				const updateRec = await pb.collection('users').update(record.id, data);
				cookies.set('session', newToken, {
					// send cookie for every page
					path: '/',
					// server side only cookie so you can't use `document.cookie`
					httpOnly: true,
					// only requests from same site can send cookies
					// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
					sameSite: 'strict',
					// only sent over HTTPS in production
					secure: process.env.NODE_ENV === 'production',
					// set cookie to expire after a month
					maxAge: 60 * 60 * 24 * 30
				});
				throw redirect(302, '/');
			} else {
				return {
					x: true
				};
			}
		}
	}
};
