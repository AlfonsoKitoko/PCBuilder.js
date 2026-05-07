export const rams = [
	{ // G.Skill Trident Z5 Neo 32 GB (2x16GB)
		manufacturer: 'G.SKILL',
		model: 'TRIDENT Z5 NEO 32GB (2x16) DDR5-6000',
		ram_type: 'DDR5',
		modules: [{ size: '16GB', quantity: 2 }],
		speed: 6000,
		cas_latency: 30,
		voltage: 135,
		price: 14900
	},
	{ // Corsair Vengeance LPX 16 GB (2x8GB) - CLÁSICA DDR4
		manufacturer: 'CORSAIR',
		model: 'VENGEANCE LPX 16GB (2x8) DDR4-3200',
		ram_type: 'DDR4',
		modules: [{ size: '8GB', quantity: 2 }],
		speed: 3200,
		cas_latency: 16,
		voltage: 135,
		price: 4500
	},
	{ // Kingston Fury Beast 64 GB (2x32GB)
		manufacturer: 'KINGSTON',
		model: 'FURY BEAST 64GB (2x32) DDR5-5600',
		ram_type: 'DDR5',
		modules: [{ size: '32GB', quantity: 2 }],
		speed: 5600,
		cas_latency: 36,
		voltage: 125,
		price: 21000
	},
	{ // Crucial Pro 16 GB (1x16GB) -> Ideal para el Warning de Single Channel
		manufacturer: 'CRUCIAL',
		model: 'PRO OVERCLOCKING 16GB (1x16) DDR5-5600',
		ram_type: 'DDR5',
		modules: [{ size: '16GB', quantity: 1 }],
		speed: 5600,
		cas_latency: 46,
		voltage: 110,
		price: 5500
	},
	{ // Teamgroup T-Force Delta 32 GB (2x16GB)
		manufacturer: 'TEAMGROUP',
		model: 'T-FORCE DELTA RGB 32GB (2x16) DDR4-3600',
		ram_type: 'DDR4',
		modules: [{ size: '16GB', quantity: 2 }],
		speed: 3600,
		cas_latency: 18,
		voltage: 135,
		price: 8900
	},
	{ // G.Skill Trident Z5 RGB 128 GB (2x64GB)
		manufacturer: 'G.SKILL',
		model: 'TRIDENT Z5 RGB 128GB (2x64) DDR5-6400',
		ram_type: 'DDR5',
		modules: [{ size: '64GB', quantity: 2 }], // Corregido a 2 módulos para 128GB
		speed: 6400,
		cas_latency: 36,
		voltage: 135,
		price: 299999
	},
	{ // Corsair Vengeance RGB 16 GB (2x8GB) DDR5
		manufacturer: 'CORSAIR',
		model: 'VENGEANCE RGB 16GB (2x8) DDR5-5200',
		ram_type: 'DDR5',
		modules: [{ size: '8GB', quantity: 2 }],
		speed: 5200,
		cas_latency: 40,
		voltage: 125,
		price: 26999
	},
	{ // Corsair Vengeance 16 GB (2x8GB) DDR5 (Sin RGB)
		manufacturer: 'CORSAIR',
		model: 'VENGEANCE 16GB (2x8) DDR5-5200',
		ram_type: 'DDR5',
		modules: [{ size: '8GB', quantity: 2 }],
		speed: 5200,
		cas_latency: 40,
		voltage: 125,
		price: 26999
	},
	{ // Corsair Vengeance RGB 32 GB (2x16GB) DDR5
		manufacturer: 'CORSAIR',
		model: 'VENGEANCE RGB 32GB (2x16) DDR5-6000',
		ram_type: 'DDR5',
		modules: [{ size: '16GB', quantity: 2 }],
		speed: 6000,
		cas_latency: 36,
		voltage: 140,
		price: 44999
	},
	{ // Kingston FURY Beast 32 GB (2x16GB)
		manufacturer: 'KINGSTON', // Corregido typo 'Kngston'
		model: 'FURY BEAST 32GB (2x16) DDR5-6000',
		ram_type: 'DDR5',
		modules: [{ size: '16GB', quantity: 2 }],
		speed: 6000,
		cas_latency: 30,
		voltage: 140,
		price: 47999
	},
	{ // G.Skill Trident Z5 Royal Neo RGB 32 GB (2x16GB)
		manufacturer: 'G.SKILL',
		model: 'TRIDENT Z5 ROYAL NEO RGB 32GB (2x16) DDR5-6000',
		ram_type: 'DDR5',
		modules: [{ size: '16GB', quantity: 2 }],
		speed: 6000,
		cas_latency: 28,
		voltage: 140,
		price: 59999
	},
	{ // Silicon Power XPOWER Storm RGB 32 GB (2x16GB)
		manufacturer: 'SILICON POWER',
		model: 'XPOWER STORM RGB 32GB (2x16) DDR5-6000',
		ram_type: 'DDR5',
		modules: [{ size: '16GB', quantity: 2 }],
		speed: 6000,
		cas_latency: 36,
		voltage: 135,
		price: 36999
	},
]

/* Plantilla RAM
{ // 
	manufacturer: '',
	model: '',
	ram_type: '',
	modules: [{ size: '', quantity: 0 }],
	speed: 0,
	cas_latency: 0,
	voltage: 0,
	price: 0
},
*/