/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	// daisyui: {
	// 	themes: ['halloween', 'light', 'dark', 'business', 'cyberpunk', 'dim', 'fantasy']
	// },


	daisyui: {
		themes: [
		  {
			mytheme: {
			
  
   
  "primary": "#0ea5e9",
			
  
   
  "secondary": "#7fcbff",
			
  
   
  "accent": "#ff7f40",
			
  
   
  "neutral": "#f3f4f6",
			
  
   
  "base-100": "#FFFFFF",
			
  
   
  "info": "#7dd3fc",
			
  
   
  "success": "#059669",
			
  
   
  "warning": "#b91c1c",
			
  
   
  "error": "#facc15",
			},
		  },
		],
	  },

	plugins: [require('daisyui')]
};

module.exports = config;
