export const storages = [
	{ // Samsung 990 Pro 2 TB
		manufacturer: 'SAMSUNG',
		model: '990 PRO 2 TB',
		capacity: 2048,
		type: 'SSD',
		form_factor: 'M.2',
		interface: 'M.2 PCIE 4.0 X4',
		cache: 2048,
		nvme: true,
		price: 18900,
	},
	{ // Western Digital Blue SN580 1 TB
		manufacturer: 'WESTERN DIGITAL',
		model: 'BLUE SN580 1 TB',
		capacity: 1024,
		type: 'SSD',
		form_factor: 'M.2',
		interface: 'M.2 PCIE 4.0 X4',
		cache: 0,
		nvme: true,
		price: 7999
	},
	{ // Crucial MX500 1 TB
		manufacturer: 'CRUCIAL',
		model: 'MX500 1 TB',
		capacity: 1024,
		type: 'SSD',
		form_factor: '2.5"', // Sin las comillas de pulgadas para evitar líos con el enum
		interface: 'SATA 6.0 GB/S',
		cache: 1024,
		nvme: false,
		price: 8999
	},
	{ // Seagate Barracuda Compute 2 TB
		manufacturer: 'SEAGATE',
		model: 'BARRACUDA COMPUTE 2 TB',
		capacity: 2048,
		type: 'HDD 7200 RPM', // Simplificado a HDD para el enum
		form_factor: '3.5"',
		interface: 'SATA 6.0 GB/S',
		cache: 64,
		nvme: false,
		price: 5999
	},
	{ // Sabrent Rocket 4 Plus 4 TB
		manufacturer: 'SABRENT',
		model: 'ROCKET 4 PLUS 4 TB',
		capacity: 4096,
		type: 'SSD',
		form_factor: 'M.2',
		interface: 'M.2 PCIE 4.0 X4',
		cache: 0,
		nvme: true,
		price: 44999
	},
	{ // Samsung 870 Evo 1 TB
		manufacturer: 'Samsung',
		model: '870 Evo 1 TB',
		capacity: 1024,
		type: 'SSD',
		form_factor: '2.5"',
		interface: 'SATA 6.0 GB/S',
		cache: 0,
		nvme: true,
		price: 33999
	},
	{ // Samsung 9100 Pro 8 TB
		manufacturer: 'Samsung',
		model: '9100 Pro 8 TB',
		capacity: 8192,
		type: 'SSD',
		form_factor: 'M.2',
		interface: 'M.2 PCIe 5.0 X4',
		cache: 8192,
		nvme: true,
		price: 209999
	},
	{ // Western Digital WD_Black SN850X 2 TB
		manufacturer: 'Western Digital',
		model: 'WD_Black SN850X 2 TB',
		capacity: 2048,
		type: 'SSd',
		form_factor: 'M.2',
		interface: 'M.2 PCIe 4.0 X4',
		cache: 2048,
		nvme: true,
		price: 38999
	},
	{ // Samsung 870 Evo 500 GB
		manufacturer: 'Samsung',
		model: '870 Evo 500 GB',
		capacity: 500,
		type: 'SSD',
		form_factor: '2.5"',
		interface: 'SATA 6.0 GB/S',
		cache: 512,
		nvme: false,
		price: 5598
	},
	{ // Silicon Power A55 512 GB
		manufacturer: 'Silicon Power',
		model: 'A55 512 GB',
		capacity: 512,
		type: 'SSD',
		form_factor: '2.5"',
		interface: 'SATA 6.0 GB/S',
		cache: 0,
		nvme: false,
		price: 7997
	},
	{ // Kingston NV3 1 TB
		manufacturer: 'Kingston',
		model: 'NV3 1 TB',
		capacity: 1024,
		type: 'SSD',
		form_factor: 'M.2',
		interface: 'M.2 PCIE 4.0 X4',
		cache: 0,
		nvme: true,
		price: 16032
	},

	// // // // // // // // // // // // // // // //
	// serginho // // // // // // // // // // // //
	// // // // // // // // // // // // // // // //

	{ // Western Digital Caviar Blue 1 TB
		manufacturer: 'WESTERN DIGITAL',
		model: 'Caviar Blue 1 TB',
		capacity: 1024,
		type: 'HDD 7200 RPM',
		form_factor: '3.5"',
		interface: 'SATA 6.0 Gb/s',
		cache: 64,
		nvme: false,
		price: 8000
	},
	{ // Seagate BarraCuda 1 TB
		manufacturer: 'Seagate',
		model: 'BarraCuda 1 TB',
		capacity: 1024,
		type: 'HDD 7200 RPM',
		form_factor: '3.5"',
		interface: 'SATA 6.0 Gb/s',
		cache: 64,
		nvme: false,
		price: 7500
	},
	{ // Kingston A400 240
		manufacturer: 'Kingston',
		model: 'A400 240 GB',
		capacity: 240,
		type: 'SSD',
		form_factor: '2.5"',
		interface: 'SATA 6.0 Gb/s',
		cache: 0,
		nvme: false,
		price: 7875
	},
	{ // Seagate BarraCuda Compute 8 TB
		manufacturer: 'Seagate',
		model: 'BarraCuda Compute 8 TB',
		capacity: 8192,
		type: 'HDD 5400 RPM',
		form_factor: '3.5"',
		interface: 'SATA 6.0 Gb/s',
		cache: 256,
		nvme: false,
		price: 23399
	},
	{ // Seagate Constellation ES.3 4 TB
		manufacturer: 'Seagate',
		model: 'Constellation ES.3 4 TB',
		capacity: 4096,
		type: 'HDD 7200 RPM',
		form_factor: '3.5"',
		interface: 'SATA 6.0 Gb/s',
		cache: 128,
		nvme: false,
		price: 14932
	},
	{ // Toshiba S300 4 TB
		manufacturer: 'Toshiba',
		model: 'S300 4 TB',
		capacity: 4096,
		type: 'HDD 5400 RPM',
		form_factor: '3.5"',
		interface: 'SATA 6.0 Gb/s',
		cache: 256,
		nvme: false,
		price: 23189
	},
	{ // Western Digital WD_BLACK 4 TB
		manufacturer: 'Western Digital',
		model: 'WD_BLACK 4 TB',
		capacity: 4096,
		type: 'HDD 7200 RPM',
		form_factor: '3.5"',
		interface: 'SATA 6.0 Gb/s',
		cache: 256,
		nvme: false,
		price: 25899
	},
	{ // Seagate Momentus 5400.6 500 GB
		manufacturer: 'Seagate',
		model: 'Momentus 5400.6 500 GB',
		capacity: 512,
		type: 'HDD 5400 RPM',
		form_factor: '2.5"',
		interface: 'SATA 3.0 Gb/s',
		cache: 8,
		nvme: false,
		price: 3900
	},
	{ // Western Digital RE3 250 GB
		manufacturer: 'Western Digital',
		model: 'RE3 250 GB',
		capacity: 256,
		type: 'HDD 7200 RPM',
		form_factor: '3.5"',
		interface: 'SATA 3.0 Gb/s',
		cache: 16,
		nvme: false,
		price: 2414
	},
	{ // Toshiba MQ01ABD050 500 GB
		manufacturer: 'Toshiba',
		model: ' MQ01ABD050 500 GB',
		capacity: 512,
		type: 'HDD 5400 RPM',
		form_factor: '2.5"',
		interface: 'SATA 3.0 Gb/s',
		cache: 8,
		nvme: false,
		price: 5900
	},
	{ // Hitachi A7K1000-1000 1 TB
		manufacturer: 'Hitachi',
		model: ' A7K1000-1000 1 TB',
		capacity: 1024,
		type: 'HDD 7200 RPM',
		form_factor: '3.5"',
		interface: 'SATA 3.0 Gb/s',
		cache: 32,
		nvme: false,
		price: 6076
	},
]

/* Plantilla Storage
{ // 
	manufacturer: '',
	model: '',
	capacity: 0,
	type: '',
	form_factor: '',
	interface: '',
	cache: 0,
	nvme: true,
	price: 0
},
*/