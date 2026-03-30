import 'dotenv/config'
import mongoose from 'mongoose'

// Importación de modelos
import Part from '../../models/part.model.js'
import Cpu from '../../models/cpu.model.js'
import Mobo from '../../models/mobo.model.js'
import Ram from '../../models/ram.model.js'
import Storage from '../../models/storage.model.js'
import Gpu from '../../models/gpu.model.js'
import Case from '../../models/case.model.js'
import Psu from '../../models/psu.model.js'
import Os from '../../models/os.model.js'

const seedComponents = async () => {
	try {
		const uri = process.env.MONGODB_ATLAS
		if (!uri) throw new Error('MONGODB_ATLAS no definida en .env')

		await mongoose.connect(new URL(uri).href)
		console.log('++ Conectado para el Seeding de Componentes ++')

		const partTypes = await Part.find()
		const getTypeId = (name) => partTypes.find(p => p.name === name.toUpperCase())?._id

		if (!getTypeId('CPU')) throw new Error('Categorías base no encontradas')

		await Promise.all([
			Case.deleteMany({}), Cpu.deleteMany({}), Gpu.deleteMany({}),
			Mobo.deleteMany({}), Os.deleteMany({}), Psu.deleteMany({}),
			Ram.deleteMany({}), Storage.deleteMany({})
		])
		console.log('-- Colecciones vaciadas --')

		// --- CPUS ---
		const cpus = [
			{	// Ryzen 7 7800X3D
				manufacturer: "AMD",
				model: "Ryzen 7 7800X3D",
				series: "Ryzen 7",
				microarchitecture: "Zen 4",
				socket: "AM5",
				core_count: 8,
				thread_count: 16,
				base_freq: 4.2,
				l2_cache: 8,
				l3_cache: 96,
				tdp: 120,
				hasIntegrated: true,
				price: 44900,
				partType: getTypeId('CPU')
			},
			{	// Core i9-14900K
				manufacturer: "INTEL",
				model: "Core i9-14900K",
				series: "Core i9",
				microarchitecture: "Raptor Lake Refresh",
				socket: "LGA1700",
				core_count: 24,
				thread_count: 32,
				base_freq: 3.2,
				l2_cache: 32,
				l3_cache: 36,
				tdp: 125,
				hasIntegrated: true,
				price: 49999,
				partType: getTypeId('CPU')
			},
			{	// Ryzen 5 7600
				manufacturer: "AMD",
				model: "Ryzen 5 7600",
				series: "Ryzen 5",
				microarchitecture: "Zen 4",
				socket: "AM5",
				core_count: 6,
				thread_count: 12,
				base_freq: 3.8,
				l2_cache: 6,
				l3_cache: 32,
				tdp: 65,
				hasIntegrated: true,
				price: 19900,
				partType: getTypeId('CPU')
			},
			{	// Core i5-13600K
				manufacturer: "INTEL",
				model: "Core i5-13600K",
				series: "Core i5",
				microarchitecture: "Raptor Lake",
				socket: "LGA1700",
				core_count: 14,
				thread_count: 20,
				base_freq: 3.5,
				l2_cache: 20,
				l3_cache: 24,
				tdp: 125,
				hasIntegrated: true,
				price: 31900,
				partType: getTypeId('CPU')
			},
			{	// Ryzen 9 7950X
				manufacturer: "AMD",
				model: "Ryzen 9 7950X",
				series: "Ryzen 9",
				microarchitecture: "Zen 4",
				socket: "AM5",
				core_count: 16,
				thread_count: 32,
				base_freq: 4.5,
				l2_cache: 16,
				l3_cache: 64,
				tdp: 170,
				hasIntegrated: true,
				price: 49999,
				partType: getTypeId('CPU')
			}
		]

		// --- MOBOS ---
		const mobos = [
			{	// MSI MAG B650 MORTAR WIFI
				manufacturer: "MSI",
				model: "MAG B650 MORTAR WIFI",
				socket: "AM5",
				form_factor: "ATX",
				chipset: "B650",
				ram_type: "DDR5",
				ram_slots: 4,
				internal_connectors:
				{
					sata_6gb: 6,
					m2_nvme: 3,
					pcie:
					{
						x16: 2,
						x1: 1
					},
					usb_headers:
					{
						usb2: 2,
						usb3_gen1: 1,
						usb3_gen2: 1
					}
				},
				rear_io: {
					usb: {
						usb2: 0,
						usb3_gen1: 4,
						usb3_gen2: 3,
						usb3_gen2x2: 1,
					},
					ethernet: {
						speed: 2500,
						quantity: 1
					},
					video: {
						vga: 0,
						dvi: 0,
						hdmi: 1,
						displayport: 1
					},
					audio_jacks: 5
				},
				wireless:
				{
					wifi: "Wi-Fi 6E",
					bluetooth: false
				},
				price: 19999,
				partType: getTypeId('MOTHERBOARD')
			},
			{	// ASUS ROG Strix Z790-I GAMING WIFI
				manufacturer: "ASUS",
				model: "ROG Strix Z790-I GAMING WIFI",
				socket: "LGA1700",
				form_factor: "Mini ITX",
				chipset: "Z790",
				ram_type: "DDR5",
				ram_slots: 2,
				internal_connectors:
				{
					sata_6gb: 2,
					m2_nvme: 2,
					pcie:
					{
						x16: 1
					},
					usb_headers:
					{
						usb2: 1,
						usb3_gen1: 1,
						usb3_gen2x2: 1
					}
				},
				rear_io: {
					usb: {
						usb2: 2,
						usb3_gen1: 1,
						usb3_gen2: 3,
						usb3_gen2x2: 1,
					},
					ethernet: {
						speed: 2500,
						quantity: 1
					},
					video: {
						vga: 0,
						dvi: 0,
						hdmi: 1,
						displayport: 0
					},
					audio_jacks: 0
				},
				wireless:
				{
					wifi: "Wi-Fi 6E",
					bluetooth: false
				},
				price: 44999,
				partType: getTypeId('MOTHERBOARD')
			},
			{	// Gigabyte B550I Aorus Pro AX
				manufacturer: "Gigabyte",
				model: "B550I Aorus Pro AX",
				socket: "AM4",
				form_factor: "Mini ITX",
				chipset: "B550",
				ram_type: "DDR4",
				ram_slots: 2,
				internal_connectors:
				{
					sata_6gb: 4,
					m2_nvme: 2,
					pcie:
					{
						x16: 1
					},
					usb_headers:
					{
						usb2: 1,
						usb3_gen1: 1
					}
				},
				rear_io: {
					usb: {
						usb2: 0,
						usb3_gen1: 4,
						usb3_gen2: 1,
						usb3_gen2x2: 1,
					},
					ethernet: {
						speed: 2500,
						quantity: 1
					},
					video: {
						vga: 0,
						dvi: 0,
						hdmi: 2,
						displayport: 1
					},
					audio_jacks: 3
				},
				wireless:
				{
					wifi: "Wi-Fi 6",
					bluetooth: false

				},
				price: 16999,
				partType: getTypeId('MOTHERBOARD')
			},
			{	// ASRock B650M Pro RS
				manufacturer: "ASRock",
				model: "B650M Pro RS",
				socket: "AM5",
				form_factor: "Micro ATX",
				chipset: "B650",
				ram_type: "DDR5",
				ram_slots: 4,
				internal_connectors:
				{
					sata_6gb: 4,
					m2_nvme: 3,
					pcie:
					{
						x16: 2,
						x4: 1,
						x1: 0
					},
					usb_headers:
					{
						usb2: 2,
						usb3_gen1: 2,
						usb3_gen2: 1
					}
				},
				rear_io: {
					usb: {
						usb2: 4,
						usb3_gen1: 2,
						usb3_gen2: 1,
						usb3_gen2x2: 1,
					},
					ethernet: {
						speed: 2500,
						quantity: 1
					},
					video: {
						vga: 0,
						dvi: 0,
						hdmi: 1,
						displayport: 1
					},
					audio_jacks: 3
				},
				wireless:
				{
					wifi: "None",
					bluetooth: false

				},
				price: 9999,
				partType: getTypeId('MOTHERBOARD')
			},
			{	// ASUS TUF Gaming B650-Plus WIFI
				manufacturer: "GIGABYTE",
				model: "B650M PLUS WIFI",
				socket: "AM5",
				form_factor: "Micro ATX",
				chipset: "B650",
				ram_type: "DDR5",
				ram_slots: 4,
				internal_connectors:
				{
					sata_6gb: 4,
					m2_nvme: 3,
					pcie:
					{
						x16: 1,
						x1: 1
					},
					usb_headers:
					{
						usb2: 2,
						usb3_gen1: 1,
						usb3_gen2: 1
					}
				},
				rear_io: {
					usb: {
						usb2: 2,
						usb3_gen1: 3,
						usb3_gen2: 1,
						usb3_gen2x2: 0,
					},
					ethernet: {
						speed: 2500,
						quantity: 1
					},
					video: {
						vga: 0,
						dvi: 0,
						hdmi: 1,
						displayport: 2
					},
					audio_jacks: 3
				},
				wireless:
				{
					wifi: "Wi-Fi 6",
					bluetooth: false

				},
				price: 14999,
				partType: getTypeId('MOTHERBOARD')
			}
		]

		// --- RAM ---
		const rams = [
			{	// G.Skill Trident Z5 Neo 32 GB
				manufacturer: "G.Skill",
				model: "Trident Z5 Neo",
				modules:
				{
					size: "16GB",
					quantity: 2
				},
				ram_type: "DDR5",
				price: 49499,
				partType: getTypeId('RAM')
			},
			{	// Corsair Vengeance LPX 8 GB
				manufacturer: "Corsair",
				model: "Vengeance LPX",
				modules:
				{
					size: "8GB",
					quantity: 2
				},
				ram_type: "DDR4",
				price: 15999,
				partType: getTypeId('RAM')
			},
			{	// Kingston Fury Beast 64 GB
				manufacturer: "Kingston",
				model: "Fury Beast",
				modules:
				{
					size: "32GB",
					quantity: 2
				},
				ram_type: "DDR5",
				price: 119999,
				partType: getTypeId('RAM')
			},
			{	// Crucial Pro Overclocking 16 GB
				manufacturer: "Crucial",
				model: "Pro Overclocking",
				modules:
				{
					size: "16GB",
					quantity: 1
				},
				ram_type: "DDR5",
				price: 23499,
				partType: getTypeId('RAM')
			},
			{	// Teamgroup T-Force Delta 32 GB
				manufacturer: "Teamgroup",
				model: "T-Force Delta",
				modules:
				{
					size: "16GB",
					quantity: 2
				},
				ram_type: "DDR4",
				price: 44999,
				partType: getTypeId('RAM')
			}
		]

		// --- STORAGES ---
		const storages = [
			{	// Samsung 990 Pro
				manufacturer: "Samsung",
				model: "990 Pro",
				capacity: "2 TB",
				type: "SSD",
				form_factor: "M.2",
				interface: "M.2 PCIe 4.0 X4",
				cache: 2048,
				nvme: true,
				price: 39100,
				partType: getTypeId('STORAGE')
			},
			{	// Western Digital Blue SN580
				manufacturer: "Western Digital",
				model: "Blue SN580",
				capacity: "1 TB",
				type: "SSD",
				form_factor: "M.2",
				interface: "M.2 PCIe 4.0 X4",
				cache: 0,
				nvme: true,
				price: 7999,
				partType: getTypeId('STORAGE')
			},
			{	// Crucial MX500
				manufacturer: "Crucial",
				model: "MX500",
				capacity: "1 TB",
				type: "SSD",
				form_factor: "2.5\"",
				interface: "SATA 6.0 Gb/s",
				cache: 1024,
				nvme: false,
				price: 8999,
				partType: getTypeId('STORAGE')
			},
			{	// Seagate BarraCuda
				manufacturer: "Seagate",
				model: "BarraCuda",
				capacity: "2 TB",
				type: "HDD 7200 RPM",
				form_factor: "3.5\"",
				interface: "SATA 6.0 Gb/s",
				cache: 64,
				nvme: false,
				price: 5999,
				partType: getTypeId('STORAGE')
			},
			{	// Sabrent Rocket 4 Plus
				manufacturer: "Sabrent",
				model: "Rocket 4 Plus",
				capacity: "4 TB",
				type: "SSD",
				form_factor: "M.2",
				interface: "M.2 PCIe 4.0 X4",
				cache: 4096,
				nvme: true,
				price: 44999,
				partType: getTypeId('STORAGE')
			}
		]

		// --- GPUS ---
		const gpus = [
			{	// ASUS ROG Strix RTX 4080
				manufacturer: "ASUS",
				series: "ROG Strix RTX 4080",
				gpu_type: "NVIDIA",
				base_freq: 2205,
				boost_freq: 2535,
				memory: 16,
				interface: "PCIe x16",
				frame_sync: "NVIDIA G-Sync",
				tdp: 320,
				ports:
				{
					hdmi: 1,
					displayport: 3
				},
				external_power: "1 x PCIe 16-Pin 12VHPWR",
				price: 149999,
				partType: getTypeId('GPU')
			},
			{	// Sapphire Pulse RX 7900 XT
				manufacturer: "Sapphire",
				series: "Pulse RX 7900 XT",
				gpu_type: "AMD RADEON",
				base_freq: 2000,
				boost_freq: 2450,
				memory: 20,
				interface: "PCIe x16",
				frame_sync: "AMD FreeSync",
				tdp: 331,
				ports:
				{
					hdmi: 2,
					displayport: 2
				},
				external_power: "2 x PCIe 8-Pin",
				price: 64999,
				partType: getTypeId('GPU')
			},
			{	// MSI Ventus 3X RTX 4070
				manufacturer: "MSI",
				series: "Ventus 3X RTX 4070 Ti",
				gpu_type: "NVIDIA",
				base_freq: 2310,
				boost_freq: 2655,
				memory: 12,
				interface: "PCIe x16",
				frame_sync: "NVIDIA G-Sync",
				tdp: 285,
				ports:
				{
					hdmi: 1,
					displayport: 3
				},
				external_power: "1 x PCIe 16-Pin 12VHPWR",
				price: 65000,
				partType: getTypeId('GPU')
			},
			{	// Gigabyte Eagle RX 6700 XT
				manufacturer: "Gigabyte",
				series: "Eagle RX 6700 XT",
				gpu_type: "AMD RADEON",
				base_freq: 2321,
				boost_freq: 2581,
				memory: 12,
				interface: "PCIe x16",
				frame_sync: "AMD FreeSync",
				tdp: 230,
				ports:
				{
					hdmi: 2,
					displayport: 2
				},
				external_power: "1 x PCIe 8-Pin + 1 x PCIe 6-Pin",
				price: 87990,
				partType: getTypeId('GPU')
			},
			{	// EVGA XC3 RTX 3060 Ti
				manufacturer: "EVGA",
				series: "XC3 ULTRA FAMING RTX 3070",
				gpu_type: "NVIDIA",
				base_freq: 1500,
				boost_freq: 1770,
				memory: 8,
				interface: "PCIe x16",
				frame_sync: "NVIDIA G-Sync",
				tdp: 220,
				ports:
				{
					hdmi: 1,
					displayport: 3
				},
				external_power: "None",
				price: 42289,
				partType: getTypeId('GPU')
			}
		]

		// --- CASES ---
		const cases = [
			{	// Corsair 4000D Airflow
				manufacturer: "Corsair",
				model: "4000D Airflow",
				case_type: "Mid-Tower",
				volume: 4855,
				form_factor: "ATX",
				front_panel: {
					usb3gen1A: 1,
					usb3gen2C: 1,
				},
				internal_bays: {
					int25: 4,
					int35: 2
				},
				power_supply: false,
				price: 11999,
				partType: getTypeId('CASE')
			},
			{	// NZXT H5 Flow
				manufacturer: "NZXT",
				model: "H5 Flow (2024)",
				case_type: "Mid-Tower",
				volume: 4499,
				form_factor: "ATX",
				front_panel: {
					usb3gen1A: 1,
					usb32gen2x2C: 1
				},
				internal_bays: {
					int25: 2,
					int35: 1
				},
				power_supply: false,
				price: 8499,
				partType: getTypeId('CASE')
			},
			{	// Fractal Design North
				manufacturer: "Fractal Design",
				model: "North",
				case_type: "Mid-Tower",
				volume: 4507,
				form_factor: "ATX",
				front_panel: {
					usb3gen1A: 1,
					usb32gen2x2C: 1,
				},
				internal_bays: {
					int25: 2,
					int35: 2
				},
				power_supply: false,
				price: 12399,
				partType: getTypeId('CASE')
			},
			{	// Lian Li PC-O11 Dynamic
				manufacturer: "Lian Li",
				model: "O11 Dynamic EVO XL",
				case_type: "Full-Tower",
				volume: 8440,
				form_factor: "EATX",
				front_panel: {
					usb3gen1A: 1,
					usb3gen2C: 1
				},
				internal_bays: {
					int25: 3,
					int35: 4
				},
				power_supply: false,
				price: 16000,
				partType: getTypeId('CASE')
			},
			{	// Cooler Master MasterBox Q300L
				manufacturer: "Cooler Master",
				model: "MasterBox Q300L",
				case_type: "Micro-Tower",
				volume: 3364,
				form_factor: "Micro ATX",
				front_panel: {
					usb3gen1A: 1,
				},
				internal_bays: {
					int25: 2,
					int35: 1
				},
				power_supply: false,
				price: 3999,
				partType: getTypeId('CASE')
			}
		]

		// --- PSUS ---
		const psus = [
			{	// Corsair RM850x
				manufacturer: "Corsair",
				model: "RM850x (2024)",
				psu_type: "ATX",
				wattage: 850,
				eff_rating: "80+ Gold",
				modular: "Full",
				eps_atx_connectors: "2 x EPS 8-pin",
				connectors:
				{
					atx_4pin: 0,
					eps_8pin: 2,
					pcie_16pin_12vhpwr: 1,
					pcie_12pin: 0,
					pcie_8pin: 0,
					pcie_6plus2pin: 3,
					pcie_6pin: 0,
					sata: 8,
					amp_molex_4pin: 3
				},
				price: 14999,
				partType: getTypeId('PSU')
			},
			{	// EVGA SuperNOVA 650 GT
				manufacturer: "EVGA",
				model: "SuperNOVA 650 GT",
				psu_type: "ATX",
				wattage: 650,
				eff_rating: "80+ Gold",
				modular: "Full",
				eps_atx_connectors: "1 x EPS 8-pin",
				connectors:
				{
					atx_4pin: 0,
					eps_8pin: 1,
					pcie_16pin_12vhpwr: 0,
					pcie_12pin: 0,
					pcie_8pin: 0,
					pcie_6plus2pin: 3,
					pcie_6pin: 0,
					sata: 6,
					amp_molex_4pin: 3,
				},
				price: 11999,
				partType: getTypeId('PSU')
			},
			{	// Seasonic Focus GX-1000
				manufacturer: "Seasonic",
				model: "Focus GX-1000 V4 ATX 3 (2024)",
				psu_type: "ATX",
				wattage: 1000,
				eff_rating: "80+ Gold",
				modular: "Full",
				eps_atx_connectors: "2 x EPS 8-pin",
				connectors:
				{
					atx_4pin: 0,
					eps_8pin: 2,
					pcie_16pin_12vhpwr: 1,
					pcie_12pin: 0,
					pcie_8pin: 0,
					pcie_6plus2pin: 3,
					pcie_6pin: 0,
					sata: 8,
					amp_molex_4pin: 3
				},
				price: 17999,
				partType: getTypeId('PSU')
			},
			{	// Be Quiet! Straight Power 11
				manufacturer: "Be Quiet!",
				model: "Straight Power 11",
				psu_type: "ATX",
				wattage: 750,
				eff_rating: "80+ Gold",
				modular: "Full",
				eps_atx_connectors: "2 x EPS 8-pin",
				connectors:
				{
					atx_4pin: 0,
					eps_8pin: 2,
					pcie_16pin_12vhpwr: 0,
					pcie_12pin: 0,
					pcie_8pin: 0,
					pcie_6plus2pin: 4,
					pcie_6pin: 0,
					sata: 11,
					amp_molex_4pin: 8
				},
				price: 14800,
				partType: getTypeId('PSU')
			},
			{	// Thermaltake Toughpower GF3 1200W
				manufacturer: "Thermaltake",
				model: "Toughpower GF3 TT Premium",
				psu_type: "ATX",
				wattage: 1650,
				eff_rating: "80+ Gold",
				modular: "Full",
				eps_atx_connectors: "2 x EPS 8-pin",
				connectors:
				{
					atx_4pin: 0,
					eps_8pin: 2,
					pcie_16pin_12vhpwr: 2,
					pcie_12pin: 0,
					pcie_8pin: 0,
					pcie_6plus2pin: 9,
					pcie_6pin: 0,
					sata: 16,
					amp_molex_4pin: 8,
				},
				price: 22999,
				partType: getTypeId('PSU')
			}
		]

		// --- OS ---
		const oss = [
			{	// Windows 11 Home
				manufacturer: "Microsoft",
				version: "Windows 11",
				edition: "Home",
				mode: "64-bit",
				price: 12000,
				partType: getTypeId('OS')
			},
			{	// Windows 11 Pro
				manufacturer: "Microsoft",
				version: "Windows 11",
				edition: "Pro",
				mode: "64-bit",
				price: 18000,
				partType: getTypeId('OS')
			},
			{	// Windows 10 Home
				manufacturer: "Microsoft",
				version: "Windows 10",
				edition: "Home",
				mode: "64-bit",
				price: 10000,
				partType: getTypeId('OS')
			},
			{	// Windows 10 Pro
				manufacturer: "Microsoft",
				version: "Windows 10",
				edition: "Pro",
				mode: "64-bit",
				price: 15000,
				partType: getTypeId('OS')
			},
			{	// Ubuntu 22.04 LTS
				manufacturer: "Canonical",
				version: "Ubuntu 22.04 LTS",
				edition: "Desktop",
				mode: "64-bit",
				price: 0,
				partType: getTypeId('OS')
			}
		]

		// Inserción por bloques para debug exacto
		await Cpu.insertMany(cpus)
		await Mobo.insertMany(mobos)
		await Ram.insertMany(rams)
		await Storage.insertMany(storages)
		await Gpu.insertMany(gpus)
		await Case.insertMany(cases)
		await Psu.insertMany(psus)
		await Os.insertMany(oss)

		console.log('++ Seed de hardware completado con éxito ++')
		await mongoose.connection.close()
		process.exit(0)
	} catch (error) {
		console.error('!! Error en el Seed de Componentes !!', error)
		process.exit(1)
	}
}

seedComponents()