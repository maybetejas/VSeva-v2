<!-- <script>
	import { servicesList } from './../../../lib/utils.js';

	import { onMount } from 'svelte';

	let messages = [];
	let selectedService = null;

	const chatStartMessage = 'Hi there! How can I assist you today?';
	const chatEndMessage = 'Is there anything else I can help you with?';

	onMount(() => {
		// Show the initial chat start message
		messages.push({ text: chatStartMessage, position: 'right' });
	});

	function handleServiceSelection(service) {
		selectedService = service;

		// Display a message based on the selected service
		messages.push({ text: `Great! Let's talk about ${service.name}.`, position: 'left' });

		// Add additional questions related to the selected service
		for (const serviceQuestion of service.services) {
			messages.push({ text: serviceQuestion, position: 'left' });
		}

		// Show the chat end message
		messages.push({ text: chatEndMessage, position: 'left' });
	}
</script>

<div class="w-full h-screen flex flex-col">
	<div class="h-1/3 w-full">
		<h1 class="text-5xl font-semibold mt-28 text-center">We're here to help 😎</h1>
	</div>
	<div class="w-full h-full rounded-3xl">

		<div class="mt-4 flex flex-wrap">
			{#each servicesList as service}
				<button class="m-2 btn btn-sm btn-primary" on:click={() => handleServiceSelection(service)}>
					{service.name}
				</button>
			{/each}
		</div>
	</div>
</div> -->

<script>
	import { onMount, afterUpdate } from 'svelte';

	let messages = [];
	let selectedSection = '';
	let currentSection = '';
	let sectionPrompts = [];

	const keyValuePairs = {
		towing: {
			'What is emergency towing?':
				'Emergency towing involves quickly responding to situations where a vehicle is stranded, damaged, or needs immediate assistance. It aims to tow the vehicle to a safe location promptly.',
			'How is flatbed towing different from other types?':
				'Flatbed towing involves using a flatbed truck to transport vehicles. Unlike traditional tow trucks, flatbeds have a flat platform that can be hydraulically inclined or lowered to facilitate easy loading and unloading of vehicles.',
			'Tell me about motorcycle towing services.':
				'Motorcycle towing services cater specifically to motorcycles, ensuring their safe transportation in the event of breakdowns, accidents, or other emergencies. Specialized equipment is used to secure and transport motorcycles securely.',
			'What is off-road recovery?':
				'Off-road recovery is the process of assisting vehicles that have become stuck or immobilized in off-road or challenging terrains. It often involves winching, towing, or providing the necessary assistance to get the vehicle back on a drivable surface.',
			'When is winching service typically needed?':
				'Winching service is required when a vehicle is stuck in mud, snow, sand, or other challenging conditions. It involves using a winch to pull the vehicle out and onto a stable surface.',
			'How long does it take for a tire change service?':
				"Tire changes usually take a short amount of time, typically around 15 to 30 minutes, depending on factors such as the complexity of the tire change, the location, and the technician's efficiency."
		},
		breakdownAssistance: {
			'What is on-site breakdown assistance?':
				'On-site breakdown assistance provides immediate help at the location where a vehicle has broken down. Service technicians arrive on-site to assess and address the issue, aiming to get the vehicle back on the road whenever possible.',
			'Explain engine diagnostics.':
				"Engine diagnostics involve using specialized tools to assess the performance of a vehicle's engine. Technicians use diagnostic equipment to retrieve error codes and identify issues affecting the engine's functionality.",
			'Tell me about transmission repair services.':
				'Transmission repair services address issues with the transmission system, which is responsible for transferring power from the engine to the wheels. This can include repairing or replacing transmission components to ensure smooth and efficient operation.',
			'What does brake system repair include?':
				"Brake system repair includes inspecting, repairing, or replacing components of a vehicle's braking system. This can involve fixing issues with brake pads, rotors, calipers, brake lines, or the brake fluid.",
			'Explain ignition system repair.':
				'Ignition system repair addresses issues related to the ignition system, which is responsible for starting the vehicle. This can include repairing or replacing components like spark plugs, ignition coils, or the ignition control module.',
			'Tell me about cooling system repair services.':
				"Cooling system repair involves fixing problems with the vehicle's cooling system, which prevents the engine from overheating. This may include repairing or replacing components such as the radiator, water pump, thermostat, or hoses."
		},
		accidentAssistance: {
			'What is emergency medical assistance?':
				'Emergency medical assistance provides immediate medical support at the scene of a vehicular accident. Trained professionals may offer first aid, coordinate with emergency services, and ensure the well-being of those involved.',
			'How is vehicle recovery done after an accident?':
				'Vehicle recovery after an accident involves safely removing and transporting the damaged vehicle from the accident scene. This can include towing the vehicle to a repair facility or a designated location.',
			'Explain collision repair services.':
				'Collision repair services include repairing damage caused by a vehicular collision. This may involve fixing or replacing damaged body panels, frames, glass, and other components to restore the vehicle to its pre-accident condition.',
			'What does insurance claim assistance involve?':
				'Insurance claim assistance helps clients navigate the process of filing and managing insurance claims after an accident. Service providers may assist in documenting damages, communicating with insurance companies, and ensuring a smooth claims process.',
			'Tell me about legal support services.':
				'Legal support services provide guidance and assistance in legal matters related to vehicle accidents. This may include advice on insurance claims, liability issues, and legal representation if necessary.',
			'Explain temporary transportation.':
				'Temporary transportation includes providing alternative means of transportation while the damaged vehicle is being repaired. This could involve rental cars, temporary loaner vehicles, or other transportation solutions.'
		},
		punctureAssistance: {
			'How is tire repair performed?':
				'Tire repair involves locating and fixing punctures or leaks in a tire. Technicians assess the damage, remove the tire from the wheel if necessary, and apply patches or plugs to seal the puncture.',
			'When is tire replacement necessary?':
				'Tire replacement is necessary when a tire is irreparably damaged or has reached the end of its lifespan. Signs for replacement include extensive tread wear, sidewall damage, or punctures in critical areas.',
			'Explain wheel balancing.':
				'Wheel balancing ensures that the weight distribution on each wheel is uniform, preventing vibrations. Technicians use balancing equipment to identify imbalances and add or remove weights to achieve proper balance.',
			'What is involved in tire pressure check service?':
				'Tire pressure check involves measuring and adjusting the air pressure in each tire. Proper tire pressure is crucial for vehicle safety, fuel efficiency, and tire longevity.',
			'How is spare tire installation done?':
				'Spare tire installation includes mounting a spare tire in the designated location in the vehicle. The spare tire provides a temporary solution in case of a flat tire until a permanent repair or replacement can be made.'
		},
		regularServicing: {
			'What happens during engine oil change?':
				'Engine oil change includes draining the old oil, replacing the oil filter, and filling the engine with fresh oil. This routine maintenance task helps ensure proper engine lubrication and prolongs the life of the engine.',
			'Explain filter replacement during regular servicing.':
				'Filter replacement involves replacing air, oil, and fuel filters to ensure optimal engine performance. Filters trap contaminants, preventing them from reaching critical engine components.',
			'What fluids are checked and topped up in regular servicing?':
				"Fluid check and top-up cover essential fluids such as coolant, brake fluid, power steering fluid, and windshield washer fluid. Maintaining proper fluid levels is crucial for the vehicle's overall performance and safety.",
			'How is brake inspection done during regular servicing?':
				'Brake inspection in servicing involves examining brake components, including pads, rotors, and fluid levels. Identifying and addressing brake issues early helps ensure reliable braking performance.',
			'What does battery check involve in regular servicing?':
				"Battery check includes testing the battery's voltage and ensuring it is in good condition. This helps prevent unexpected battery failures and ensures reliable starting.",
			'Explain tire rotation in regular servicing.':
				'Tire rotation is the practice of moving tires to different positions on the vehicle to ensure even wear and extend tire lifespan. This helps maximize the longevity of the tires and enhances overall vehicle performance.'
		}
	};

	const sections = Object.keys(keyValuePairs);

	onMount(() => {
		// Welcome message from the chat bot
		messages = [{ text: 'Hello! How can I help you?', sender: 'bot' }];
	});

	afterUpdate(() => {
		// Scroll to the bottom of the chat window after each update
		const chatWindow = document.getElementById('chat-window');
		chatWindow.scrollTop = chatWindow.scrollHeight;
	});

	function sendMessage(prompt) {
		// Check if the selected prompt is a section
		if (sections.includes(prompt)) {
			// Set the current section
			currentSection = prompt;
			// Display prompts related to the selected section
			sectionPrompts = Object.keys(keyValuePairs[prompt]);
			messages = [...messages, { text: `Questions about ${prompt}`, sender: 'bot' }];

			// Set the selected section for styling
			selectedSection = prompt;
		} else {
			// Get the response associated with the selected prompt
			const response = keyValuePairs[currentSection][prompt];

			// Add the user's message to the chat
			messages = [...messages, { text: prompt, sender: 'user' }];

			// Add the chat bot's response to the chat
			messages = [...messages, { text: response, sender: 'bot' }];
		}
	}
</script>

<div class="w-full h-screen flex flex-col justify-evenly">
	<div class="">
		<h1 class="text-5xl font-semibold mt-2 text-center">We're here to help 😎</h1>
	</div>

	<div id="chat-window" class="mt-2 w-96 h-1/3 bg-gray-100 p-4 rounded-lg overflow-auto">
		{#each messages as { text, sender }, index}
			<div class="{sender === 'bot' ? 'text-left' : 'text-right'} mb-2" key={index}>
				<!-- <div class="bg-white p-2 rounded-lg shadow">
				{text}
			</div> -->
				<div class="chat chat-start">
					<div class="chat-bubble chat-bubble-secondary">{text}</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-2 flex flex-wrap">
		{#each sections as section}
			<button
				class="m-2 btn btn-sm btn-primary {selectedSection === section ? 'btn-selected' : ''}"
				on:click={() => sendMessage(section)}
			>
				{section}
			</button>
		{/each}
	</div>

	<hr class="my-2" />

	<div class="mt-2 flex flex-wrap">
		{#each sectionPrompts as prompt}
			<div class="m-2 bg-white p-2 rounded-lg shadow" on:click={() => sendMessage(prompt)}>
				{prompt}
			</div>
		{/each}
	</div>


	<div class="w-full flex flex-col justify-center items-center mb-8">
		<h1 class="font-semibold">Didn't find what you were looking for?</h1>
		<a target="_blank" href="https://www.whatsapp.com/"
			><button class="btn bg-green-500 mt-4">Whatsapp us</button></a
		>
	</div>
</div>

<style>
	.btn-selected {
		background-color: #718096; /* or any other color for selected sections */
		color: #fff; /* text color for selected sections */
	}
</style>
