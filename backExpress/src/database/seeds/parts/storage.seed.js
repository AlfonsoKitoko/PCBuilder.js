export const storages = [
	{ // Samsung 990 Pro 2 TB
		manufacturer: 'SAMSUNG',
		model: '990 PRO',
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
		model: 'BLUE SN580',
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
		model: 'MX500',
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
		model: 'BARRACUDA COMPUTE',
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
		model: 'ROCKET 4 PLUS',
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
		model: '870 Evo',
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
		model: '9100 Pro',
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
		model: 'WD_Black SN850X',
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
		model: '870 Evo',
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
		model: 'A55',
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
		model: 'NV3',
		capacity: 1024,
		type: 'SSD',
		form_factor: 'M.2',
		interface: 'M.2 PCIE 4.0 X4',
		cache: 0,
		nvme: true,
		price: 16032
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