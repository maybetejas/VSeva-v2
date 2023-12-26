/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	daisyui: {
		themes: ['winter','halloween', 'light', 'dark', 'business', 'cyberpunk', 'dim', 'fantasy']
	},

	plugins: [require('daisyui')]
};

module.exports = config;
