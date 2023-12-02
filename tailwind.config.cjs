/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	daisyui: {
		themes: ['halloween', 'light', 'dark', 'business', 'cyberpunk']
	},

	plugins: [require('daisyui')]
};

module.exports = config;
