export const gpus = [
	{ // ASUS ROG Strix RTX 4080
		manufacturer: 'ASUS',
		model: 'ROG Strix RTX 4080',
		gpu_type: 'NVIDIA',
		base_freq: 2205,
		boost_freq: 2535,
		memory: 16,
		memory_type: 'GDDR6X', // Añadido para cumplir el modelo
		interface: 'PCIe x16',
		frame_sync: 'NVIDIA G-Sync',
		tdp: 320,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '1 x PCIe 16-Pin 12VHPWR',
		price: 149999
	},
	{ // Sapphire Pulse RX 7900 XT
		manufacturer: 'Sapphire',
		model: 'Pulse RX 7900 XT',
		gpu_type: 'AMD RADEON',
		base_freq: 2000,
		boost_freq: 2450,
		memory: 20,
		memory_type: 'GDDR6',
		interface: 'PCIe x16',
		frame_sync: 'AMD FreeSync',
		tdp: 331,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 2,
			displayport: 2
		},
		external_power: '2 x PCIe 8-Pin',
		price: 64999
	},
	{ // MSI Ventus 3X RTX 4070
		manufacturer: 'MSI',
		model: 'Ventus 3X RTX 4070 Ti',
		gpu_type: 'NVIDIA',
		base_freq: 2310,
		boost_freq: 2655,
		memory: 12,
		memory_type: 'GDDR6X',
		interface: 'PCIe x16',
		frame_sync: 'NVIDIA G-Sync',
		tdp: 285,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '1 x PCIe 16-Pin 12VHPWR',
		price: 65000
	},
	{ // Gigabyte Eagle RX 6700 XT
		manufacturer: 'Gigabyte',
		model: 'Eagle RX 6700 XT',
		gpu_type: 'AMD RADEON',
		base_freq: 2321,
		boost_freq: 2581,
		memory: 12,
		memory_type: 'GDDR6',
		interface: 'PCIe x16',
		frame_sync: 'AMD FreeSync',
		tdp: 230,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 2,
			displayport: 2
		},
		external_power: '1 x PCIe 8-Pin + 1 x PCIe 6-Pin',
		price: 87990
	},
	{ // EVGA XC3 RTX 3060 Ti
		manufacturer: 'EVGA',
		model: 'XC3 ULTRA GAMING RTX 3070',
		gpu_type: 'NVIDIA',
		base_freq: 1500,
		boost_freq: 1770,
		memory: 8,
		memory_type: 'GDDR6',
		interface: 'PCIe x16',
		frame_sync: 'NVIDIA G-Sync',
		tdp: 220,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: 'None',
		price: 42289
	},
	{ // Asus PRIME OC Radeon RX 9070 XT
		manufacturer: 'Asus',
		model: 'PRIME OC Radeon RX 9070 XT',
		gpu_type: 'AMD RADEON',
		base_freq: 2460,
		boost_freq: 3030,
		memory: 16,
		memory_type: 'GDDR6',
		interface: 'PCIe x16',
		frame_sync: 'AMD FreeSync',
		tdp: 304,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '3 X PCIE 8-PIN',
		price: 79999
	},
	{ // ASUS TUF Gaming GeForce RTX 5090 OG
		manufacturer: 'ASUS',
		model: 'TUF Gaming OC GeForce RTX 5090',
		gpu_type: 'NVIDIA',
		base_freq: 2010,
		boost_freq: 2550,
		memory: 32,
		memory_type: 'GDDR7',
		interface: 'PCIe x16',
		frame_sync: 'NVIDIA G-Sync',
		tdp: 575,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 2,
			displayport: 3
		},
		external_power: '1 X PCIE 16-PIN 12VHPWR',
		price: 334999
	},
	{ // Intel Limited Edition Arc B580
		manufacturer: 'Intel',
		model: 'Limited Edition Arc B580',
		gpu_type: 'INTEL',
		base_freq: 2670,
		boost_freq: 2850,
		memory: 12,
		memory_type: 'GDDR6',
		interface: 'PCIe x16',
		frame_sync: 'None',
		tdp: 190,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '1 x PCIe 8-Pin',
		price: 24999
	},
	{ // ASRock Challenger Radeon RX 9070 XT
		manufacturer: 'ASRock',
		model: 'Challenger Radeon RX 9070 XT',
		gpu_type: 'AMD RADEON',
		base_freq: 2400,
		boost_freq: 2970,
		memory: 16,
		memory_type: 'GDDR6',
		interface: 'PCIe x16',
		frame_sync: 'AMD FreeSync',
		tdp: 304,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '2 X PCIE 8-PIN',
		price: 70999
	},
	{ // MSI SHADOW 3X OC GeForce RTX 5070 Ti
		manufacturer: 'MSI',
		model: 'SHADOW 3X OC GeForce RTX 5070 Ti',
		gpu_type: 'NVIDIA',
		base_freq: 2300,
		boost_freq: 2497,
		memory: 16,
		memory_type: 'GDDR7',
		interface: 'PCIe x16',
		frame_sync: 'NVIDIA G-Sync',
		tdp: 300,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '1 X PCIE 16-PIN 12VHPWR',
		price: 97999
	},
	{ // ASRock Challenger OC Arc B570
		manufacturer: 'ASRock',
		model: 'Challenger OC Arc B570',
		gpu_type: 'INTEL',
		base_freq: 2500,
		boost_freq: 2600,
		memory: 10,
		memory_type: 'GDDR6',
		interface: 'PCIe x16',
		frame_sync: 'None',
		tdp: 150,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '1 X PCIE 8-PIN',
		price: 25999
	},

	// // // // // // // // // // // // // // // //
	// serginho // // // // // // // // // // // //
	// // // // // // // // // // // // // // // //

	{ // Gigabyte GAMING OC GeForce RTX 3070
		manufacturer: 'Gigabyte',
		model: 'GAMING OC GeForce RTX 3070',
		gpu_type: 'NVIDIA',
		base_freq: 1500,
		boost_freq: 1815,
		memory: 8,
		memory_type: 'GDDR6', // Añadido para cumplir el modelo
		interface: 'PCIe x16',
		frame_sync: 'NVIDIA G-Sync',
		tdp: 220,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 2,
			displayport: 2
		},
		external_power: '1 x PCIe 8-pin + 1 x PCIe 6-pin',
		price: 69500
	},

	{ // MSI Radeon RX 5600 XT GAMING
		manufacturer: 'MSI',
		model: 'Radeon RX 5600 XT GAMING MX',
		gpu_type: 'AMD RADEON',
		base_freq: 1280,
		boost_freq: 1620,
		memory: 6,
		memory_type: 'GDDR6', // Añadido para cumplir el modelo
		interface: 'PCIe x16',
		frame_sync: 'AMD FreeSync',
		tdp: 150,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '2 x PCIe 8-pin',
		price: 53000
	},

	{ // Gigabyte GAMING GeForce GTX 1080
		manufacturer: 'Gigabyte',
		model: 'GAMING GeForce GTX 1080',
		gpu_type: 'NVIDIA',
		base_freq: 1721,
		boost_freq: 1860,
		memory: 8,
		memory_type: 'GDDR5X', // Añadido para cumplir el modelo
		interface: 'PCIe x16',
		frame_sync: 'NVIDIA G-Sync',
		tdp: 180,
		ports: {
			vga: 0,
			dvi: 1,
			hdmi: 1,
			displayport: 3
		},
		external_power: '1 x PCIe 8-pin',
		price: 38900
	},

	{ // MSI ARMOR OC Radeon RX 580
		manufacturer: 'MSI',
		model: 'ARMOR OC Radeon RX 580',
		gpu_type: 'AMD RADEON',
		base_freq: 1257,
		boost_freq: 1366,
		memory: 8,
		memory_type: 'GDDR5', // Añadido para cumplir el modelo
		interface: 'PCIe x16',
		frame_sync: 'AMD FreeSync',
		tdp: 185,
		ports: {
			vga: 0,
			dvi: 1,
			hdmi: 2,
			displayport: 2
		},
		external_power: '1 x PCIe 8-pin',
		price: 34800
	},
	{ // ASRock Intel Arc A380 Challenger
		manufacturer: 'ASRock',
		model: 'Intel Arc A380 Challenger',
		gpu_type: 'Intel',
		base_freq: 2250,
		boost_freq: 2250,
		memory: 6,
		memory_type: 'GDDR6', // Añadido para cumplir el modelo
		interface: 'PCIe x16',
		frame_sync: 'None',
		tdp: 75,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '1 x PCIe 8-pin',
		price: 13999
	},
	{ // Sapphire PULSE Radeon RX 6700 XT
		manufacturer: 'Sapphire',
		model: 'PULSE Radeon RX 6700 XT',
		gpu_type: 'AMD Radeon',
		base_freq: 2321,
		boost_freq: 2581,
		memory: 12,
		memory_type: 'GDDR6', // Añadido para cumplir el modelo
		interface: 'PCIe x16',
		frame_sync: 'AMD FreeSync',
		tdp: 230,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '1 x PCIe 8-pin + 1 x PCIe 6-pin',
		price: 57900
	},
	{ // EVGA SC GAMING GeForce GTX 1060
		manufacturer: 'EVGA',
		model: 'SC GAMING GeForce GTX 1060',
		gpu_type: 'NVIDIA',
		base_freq: 1607,
		boost_freq: 1835,
		memory: 6,
		memory_type: 'GDDR5', // Añadido para cumplir el modelo
		interface: 'PCIe x16',
		frame_sync: 'nvidia G-Sync',
		tdp: 120,
		ports: {
			vga: 0,
			dvi: 1,
			hdmi: 1,
			displayport: 3
		},
		external_power: '1 x PCIe 6-pin',
		price: 29900
	},
	{ // Gigabyte GAMING OC GeForce RTX 2080 Ti
		manufacturer: 'Gigabyte',
		model: 'GAMING OC GeForce RTX 2080 Ti',
		gpu_type: 'NVIDIA',
		base_freq: 1350,
		boost_freq: 1350,
		memory: 11,
		memory_type: 'GDDR6', // Añadido para cumplir el modelo
		interface: 'PCIe x16',
		frame_sync: 'nvidia G-Sync',
		tdp: 250,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 1,
			displayport: 3
		},
		external_power: '2 x PCIe 8-pin',
		price: 78500
	},
]

/* Plantilla gpu
	{ // 
		manufacturer: '',
		model: '',
		gpu_type: '',
		base_freq: 0,
		boost_freq: 0,
		memory: 0,
		memory_type: '',
		interface: '',
		frame_sync: '',
		tdp: 0,
		ports: {
			vga: 0,
			dvi: 0,
			hdmi: 0,
			displayport: 0
		},
		external_power: '',
		price: 0
	},
*/