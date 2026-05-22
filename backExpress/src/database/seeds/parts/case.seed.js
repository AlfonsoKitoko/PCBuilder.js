export const cases = [
	{ // Corsair 4000D Airflow
		manufacturer: 'CORSAIR',
		model: '4000D AIRFLOW',
		case_type: 'MID-TOWER',
		volume: 4855,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 4,
			int35: 2
		},
		power_supply: false,
		color: 'BLACK',
		price: 11999
	},
	{ // NZXT H5 Flow
		manufacturer: 'NZXT',
		model: 'H5 FLOW (2024)',
		case_type: 'MID-TOWER',
		volume: 4499,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 1,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 1
		},
		power_supply: false,
		color: 'BLACK',
		price: 8499
	},
	{ // Fractal Design North
		manufacturer: 'FRACTAL DESIGN',
		model: 'NORTH',
		case_type: 'MID-TOWER',
		volume: 4507,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 1,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 2
		},
		power_supply: false,
		color: 'BLACK',
		price: 12399
	},
	{ // Lian Li O11 Dynamic EVO XL
		manufacturer: 'LIAN LI',
		model: 'O11 DYNAMIC EVO XL',
		case_type: 'FULL-TOWER',
		volume: 8440,
		form_factor: 'EATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 3,
			int35: 4
		},
		power_supply: false,
		color: 'WHITE',
		price: 16000
	},
	{ // Cooler Master MasterBox Q300L
		manufacturer: 'COOLER MASTER',
		model: 'MASTERBOX Q300L',
		case_type: 'MICRO-TOWER',
		volume: 3364,
		form_factor: 'MICRO-ATX', // Normalizado para coincidir con Mobo
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 1
		},
		power_supply: false,
		color: 'WHITE',
		price: 3999
	},
	{ // Montech XR-B
		manufacturer: 'MONTECH',
		model: 'XR-B',
		case_type: 'MID-TOWER',
		volume: 4502,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 2
		},
		power_supply: false,
		color: 'BLACK',
		price: 6990
	},
	{ // Lian Li O11 VISION COMPACT 
		manufacturer: 'LIAN LI',
		model: 'VISION COMPACT',
		case_type: 'MID-TOWER',
		volume: 5743,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 1,
			usb3gen1A: 0,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 2
		},
		power_supply: false,
		color: 'WHITE',
		price: 12499
	},
	{ // Montech XR
		manufacturer: 'Montech',
		model: 'XR',
		case_type: 'MID-TOWER',
		volume: 4502,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 2
		},
		power_supply: false,
		color: 'BLACK',
		price: 6990
	},
	{ // Phanteks Eclipse G370A
		manufacturer: 'Phanteks',
		model: 'Eclipse G370A',
		case_type: 'MID-TOWER',
		volume: 4869,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 0,
			usb3gen1C: 1
		},
		internal_bays: {
			int25: 2,
			int35: 0
		},
		power_supply: false,
		color: 'Black',
		price: 4599
	},
	{ // Phanteks XT PRO ULTRA
		manufacturer: 'Phanteks',
		model: 'XT PRO ULTRA',
		case_type: 'MID-TOWER',
		volume: 5175,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 3,
			int35: 2
		},
		power_supply: false,
		color: 'Black',
		price: 6999
	},
	{ // HYTE Y70 Touch Infinite
		manufacturer: 'HYTE',
		model: 'Y70 Touch Infinite',
		case_type: 'MID-TOWER',
		volume: 7068,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 0,
			int35: 2
		},
		power_supply: false,
		color: 'Black',
		price: 37999
	},
	{ // HYTE Y70
		manufacturer: 'HYTE',
		model: 'Y70',
		case_type: 'MID-TOWER',
		volume: 7068,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 0,
			int35: 2
		},
		power_supply: false,
		color: 'Black',
		price: 19999
	},
	{ // Fractal Design Pop Air
		manufacturer: 'Fractal',
		model: 'Design Pop Air',
		case_type: 'MID-TOWER',
		volume: 4621,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 2,
			usb32gen2x2C: 0,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 2
		},
		power_supply: false,
		color: 'Black',
		price: 8499
	},

	// // // // // // // // // // // // // // // //
	// serginho // // // // // // // // // // // //
	// // // // // // // // // // // // // // // //

	{ // NZXT H3 Flow
		manufacturer: 'NZXT',
		model: 'H3 Flow',
		case_type: 'MID-TOWER',
		volume: 3501,
		form_factor: 'Micro-ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 1,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 1,
			int35: 1
		},
		power_supply: false,
		color: 'WHITE',
		price: 4999
	},

	{ // Fractal Design Meshify 3
		manufacturer: 'Fractal Design',
		model: 'Meshify 3',
		case_type: 'MID-TOWER',
		volume: 5027,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 1,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 2
		},
		power_supply: false,
		color: 'BLACK',
		price: 15499
	},

	{ // Montech X3 Mesh
		manufacturer: 'Montech',
		model: 'X3 Mesh',
		case_type: 'MID-TOWER',
		volume: 5027,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 1,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 2
		},
		power_supply: false,
		color: 'BLACK',
		price: 6999
	},


	{ // Antec NX200M
		manufacturer: 'Antec',
		model: 'NX200M',
		case_type: 'MID-TOWER',
		volume: 5027,
		form_factor: 'Micro-ATX',
		front_panel: {
			usb2TypA: 1,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 1,
			int35: 2
		},
		power_supply: false,
		color: 'BLACK',
		price: 3999
	},
	{ // darkFlash DB330M MicroATX
		manufacturer: 'darkFlash ',
		model: 'DB330M',
		case_type: 'MINI-TOWER',
		volume: 2903,
		form_factor: 'Micro-ATX',
		front_panel: {
			usb2TypA: 1,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 1
		},
		power_supply: false,
		color: 'BLACK',
		price: 6699
	},
	{ // Okinos Air Cross
		manufacturer: 'Okinos ',
		model: 'Air Cross',
		case_type: 'MID-TOWER',
		volume: 5146,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 1,
			usb3gen1A: 0,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 2,
			int35: 1
		},
		power_supply: false,
		color: 'BLACK',
		price: 8699
	},
	{ // Fractal Design Core 1000
		manufacturer: 'Fractal ',
		model: 'Design Core 1000',
		case_type: 'MID-TOWER',
		volume: 2581,
		form_factor: 'Micro-ATX',
		front_panel: {
			usb2TypA: 1,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 0,
			int35: 2
		},
		power_supply: false,
		color: 'BLACK',
		price: 8699
	},
	{ // ARCTIC Xtender Mirror
		manufacturer: 'ARCTIC ',
		model: 'Xtender Mirror',
		case_type: 'MID-TOWER',
		volume: 6464,
		form_factor: 'ATX',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 1,
			usb32gen2x2C: 0,
			usb3gen2C: 1,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 3,
			int35: 1
		},
		power_supply: false,
		color: 'BLACK',
		price: 11999
	},
]

/* Plantilla Case
	{ // 
		manufacturer: '',
		model: '',
		case_type: '',
		volume: 0,
		form_factor: '',
		front_panel: {
			usb2TypA: 0,
			usb3gen1A: 0,
			usb32gen2x2C: 0,
			usb3gen2C: 0,
			usb3gen1C: 0
		},
		internal_bays: {
			int25: 0,
			int35: 0
		},
		power_supply: false,
		color: '',
		price: 0
	},
 */