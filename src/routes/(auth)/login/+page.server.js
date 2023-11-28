import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import axios from 'axios';
import { PUBLIC_DB_URL } from '$env/static/public';

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const contact = formData.get('contact');

		const pb = new PocketBase(PUBLIC_DB_URL);
		let record;
		try {
			record = await pb.collection('users').getFirstListItem(`contact="${contact}"`);
		} catch (error) {
			return {
				x: true
			};
		}
		if (record) {
			cookies.set('verification', contact, {
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

			const otp = Math.floor(1000 + Math.random() * 9000).toString();
			const data = {
				otp
			};

			const updateRec = await pb.collection('users').update(record.id, data);

			const apiKey = 'x70aiGvnAg8okcQciXhfFV5gdAi626gVoo0iL9Hv4pkrrDX1uo8nNOYJNyss';
			const numbers = contact;

			// send otp
			const settings = {
				method: 'POST',
				url: 'https://www.fast2sms.com/dev/bulkV2',
				headers: {
					authorization: apiKey
				},
				data: {
					variables_values: otp,
					route: 'otp',
					numbers: numbers
				}
			};

			axios(settings)
				.then((response) => {
					console.log(response.data.message);
				})
				.catch((error) => {
					console.error(error);
				});

			throw redirect(302, '/otp-ver');

			// const newToken = crypto.randomUUID();
			// const data = {
			//     userAuthToken: newToken,
			// };

			// const updateRec = await pb.collection('users').update(record.id, data);
			// cookies.set('session', newToken, {
			//     // send cookie for every page
			//     path: '/',
			//     // server side only cookie so you can't use `document.cookie`
			//     httpOnly: true,
			//     // only requests from same site can send cookies
			//     // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			//     sameSite: 'strict',
			//     // only sent over HTTPS in production
			//     secure: process.env.NODE_ENV === 'production',
			//     // set cookie to expire after a month
			//     maxAge: 60 * 60 * 24 * 30,
			// })
			// throw redirect(302, '/');
		}
	}
};
