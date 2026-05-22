export const psus = [
	{ // Corsair RM850x
		manufacturer: 'CORSAIR',
		model: 'RM850X (2024)',
		psu_type: 'ATX',
		wattage: 850,
		eff_rating: '80+ GOLD',
		modular: 'FULL',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0, // Requerido por esquema
			pcie_16pin_12vhpwr: 1,
			pcie_8pin: 0,
			pcie_6plus2pin: 3,
			pcie_6pin: 0,
			sata: 8,
			molex_4pin: 3
		},
		price: 14999
	},
	{ // EVGA SuperNOVA 650 GT
		manufacturer: 'EVGA',
		model: 'SUPERNOVA 650 GT',
		psu_type: 'ATX',
		wattage: 650,
		eff_rating: '80+ GOLD',
		modular: 'FULL',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 1,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 3,
			pcie_6pin: 0,
			sata: 6,
			molex_4pin: 3
		},
		price: 11999
	},
	{ // Seasonic Focus GX-1000
		manufacturer: 'SEASONIC',
		model: 'FOCUS GX-1000 V4 ATX 3 (2024)',
		psu_type: 'ATX',
		wattage: 1000,
		eff_rating: '80+ GOLD',
		modular: 'FULL',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 1,
			pcie_8pin: 0,
			pcie_6plus2pin: 3,
			pcie_6pin: 0,
			sata: 8,
			molex_4pin: 3
		},
		price: 17999
	},
	{ // Be Quiet! Straight Power 11
		manufacturer: 'BE QUIET!',
		model: 'STRAIGHT POWER 11',
		psu_type: 'ATX',
		wattage: 750,
		eff_rating: '80+ GOLD',
		modular: 'FULL',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 4,
			pcie_6pin: 0,
			sata: 11,
			molex_4pin: 8
		},
		price: 14800
	},
	{ // Thermaltake Toughpower GF3 1200W
		manufacturer: 'THERMALTAKE',
		model: 'TOUGHPOWER GF3 TT PREMIUM',
		psu_type: 'ATX',
		wattage: 1650,
		eff_rating: '80+ GOLD',
		modular: 'FULL',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 2,
			pcie_8pin: 0,
			pcie_6plus2pin: 9,
			pcie_6pin: 0,
			sata: 16,
			molex_4pin: 8
		},
		price: 22999
	},
	{ // MSI MAG A750GL PCIE5 750 W
		manufacturer: 'MSI',
		model: 'MAG A750GL',
		psu_type: 'ATX',
		wattage: 750,
		eff_rating: '80+ GOLD',
		modular: 'FULL',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 1,
			pcie_8pin: 0,
			pcie_6plus2pin: 3,
			pcie_6pin: 0,
			sata: 8,
			molex_4pin: 4
		},
		price: 8999
	}
	, { // MSI MAG A850GL PCIE5 850
		manufacturer: 'MSI',
		model: 'MAG A850GL PCIE5 850',
		psu_type: 'ATX',
		wattage: 850,
		eff_rating: '80+ GOLD',
		modular: 'FULL',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 1,
			pcie_8pin: 0,
			pcie_6plus2pin: 4,
			pcie_6pin: 0,
			sata: 8,
			molex_4pin: 4
		},
		price: 9999
	},
	{ // Corsair HX1500i (2025)
		manufacturer: 'Corsair',
		model: 'HX1500i (2025)',
		psu_type: 'ATX',
		wattage: 1500,
		eff_rating: '80+ Platinum',
		modular: 'Full',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 2,
			pcie_8pin: 0,
			pcie_6plus2pin: 5,
			pcie_6pin: 0,
			sata: 8,
			molex_4pin: 6
		},
		price: 34999
	},
	{ // Silverstone ST30SF
		manufacturer: 'Silverstone',
		model: 'ST30SF',
		psu_type: 'SFX',
		wattage: 300,
		eff_rating: '80+ BRONZE',
		modular: 'No',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 1,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 0,
			pcie_6pin: 10,
			sata: 3,
			molex_4pin: 2
		},
		price: 9192
	},
	{ // Asus ROG THOR 1600T Gaming
		manufacturer: 'Asus',
		model: 'ROG THOR 1600T Gaming',
		psu_type: 'ATX',
		wattage: 1600,
		eff_rating: '80+ Titanium',
		modular: 'Full',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 1,
			pcie_8pin: 0,
			pcie_6plus2pin: 10,
			pcie_6pin: 0,
			sata: 12,
			molex_4pin: 6
		},
		price: 69999
	},
	{ // be quiet! Dark Power 13
		manufacturer: 'be quiet!',
		model: 'Dark Power 13',
		psu_type: 'ATX',
		wattage: 1000,
		eff_rating: '80+ Titanium',
		modular: 'Full',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 1,
			pcie_8pin: 0,
			pcie_6plus2pin: 4,
			pcie_6pin: 0,
			sata: 13,
			molex_4pin: 3
		},
		price: 23490
	},
	{ // Thermaltake Toughpower GX2 600 W
		manufacturer: 'Thermaltake',
		model: 'Toughpower GX2',
		psu_type: 'ATX',
		wattage: 600,
		eff_rating: '80+ Gold',
		modular: 'No',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 1,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 2,
			pcie_6pin: 0,
			sata: 6,
			molex_4pin: 3
		},
		price: 5999
	},

	// // // // // // // // // // // // // // // //
	// serginho // // // // // // // // // // // //
	// // // // // // // // // // // // // // // //

	{ // MSI MAG A650BN
		manufacturer: 'MSI',
		model: 'MAG A650BN',
		psu_type: 'ATX',
		wattage: 650,
		eff_rating: '80+ BRONZE',
		modular: 'No',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 1,
			eps_4pin: 0, // Requerido por esquema
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 2,
			pcie_6pin: 0,
			sata: 5,
			molex_4pin: 2
		},
		price: 5999
	},

	{ // ASRock Steel Legend SL-650G
		manufacturer: 'ASRock',
		model: 'Steel Legend SL-650G',
		psu_type: 'ATX',
		wattage: 650,
		eff_rating: '80+ GOLD',
		modular: 'FULL',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0, // Requerido por esquema
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 2,
			pcie_6pin: 0,
			sata: 6,
			molex_4pin: 3
		},
		price: 6499
	},

	{ // MSI MAG A550BN
		manufacturer: 'MSI',
		model: 'MAG A550BN',
		psu_type: 'ATX',
		wattage: 550,
		eff_rating: '80+ BRONZE',
		modular: 'No',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 1,
			eps_4pin: 0, // Requerido por esquema
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 2,
			pcie_6pin: 0,
			sata: 5,
			molex_4pin: 2
		},
		price: 5499
	},

	{ // EVGA 400 N1
		manufacturer: 'EVGA',
		model: '400 N1',
		psu_type: 'ATX',
		wattage: 400,
		eff_rating: 'None',
		modular: 'No',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 1,
			eps_4pin: 0, // Requerido por esquema
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 1,
			pcie_6pin: 1,
			sata: 4,
			molex_4pin: 3
		},
		price: 4499
	},
	{ // Thermaltake Smart RGB
		manufacturer: 'Thermaltake',
		model: 'Smart RGB',
		psu_type: 'ATX',
		wattage: 500,
		eff_rating: '80+',
		modular: 'NO',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 1,
			eps_4pin: 0, // Requerido por esquema
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 2,
			pcie_6pin: 0,
			sata: 6,
			molex_4pin: 3
		},
		price: 4499
	},
	{ // Thermaltake Smart
		manufacturer: 'Thermaltake',
		model: 'Smart',
		psu_type: 'ATX',
		wattage: 600,
		eff_rating: '80+',
		modular: 'NO',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 1,
			eps_4pin: 0, // Requerido por esquema
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 2,
			pcie_6pin: 0,
			sata: 6,
			molex_4pin: 3
		},
		price: 4299
	},
	{ // ENDORFY Vero L5
		manufacturer: 'ENDORFY',
		model: 'Vero L5',
		psu_type: 'ATX',
		wattage: 500,
		eff_rating: '80+ BRONZE',
		modular: 'NO',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 1,
			eps_4pin: 0, // Requerido por esquema
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 2,
			pcie_6pin: 0,
			sata: 5,
			molex_4pin: 1
		},
		price: 9599
	},
	{ // MSI MAG A650GL
		manufacturer: 'MSI',
		model: 'MAG A650GL',
		psu_type: 'ATX',
		wattage: 650,
		eff_rating: '80+ GOLD',
		modular: 'FULL',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 2,
			eps_4pin: 0, // Requerido por esquema
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 4,
			pcie_6pin: 0,
			sata: 6,
			molex_4pin: 4
		},
		price: 8999
	}
]

/* Plantilla PSU
	{ // 
		manufacturer: '',
		model: '',
		psu_type: '',
		wattage: 0,
		eff_rating: '',
		modular: '',
		connectors: {
			atx_24pin: 1,
			eps_8pin: 0,
			eps_4pin: 0,
			pcie_16pin_12vhpwr: 0,
			pcie_8pin: 0,
			pcie_6plus2pin: 0,
			pcie_6pin: 0,
			sata: 0,
			molex_4pin: 0
		},
		price: 0
	},
*/