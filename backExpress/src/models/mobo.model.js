import mongoose from 'mongoose'
import { RAM_TYPE, WIFI_STANDARD, MOBO_FORM_FACTOR } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const rearIOSchema = new mongoose.Schema({
	ps2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	serial_com: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	usb2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	usb3_gen1: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	usb3_gen2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	usb3_gen2x2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator }
}, { _id: false })

const expansionSlotsSchema = new mongoose.Schema({
	x16: { type: Number, min: 0, required: true, validate: positiveIntegerValidator },
	x8: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	x4: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	x1: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	// Legacy (por si aca)
	pci_legacy: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	agp_slot: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator }
}, { _id: false })

const usbHeaderesSchema = new mongoose.Schema({
	usb2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	usb3_gen1: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	usb3_gen2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	usb3_gen2x2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	serial_header: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator }
}, { _id: false })

const storageConnectorsSchema = new mongoose.Schema({
	sata_3gb: { type: Number, min: 0, required: true, validate: positiveIntegerValidator },
	sata_6gb: { type: Number, min: 0, required: true, validate: positiveIntegerValidator },
	m2_slots: { type: Number, min: 0, required: true, validate: positiveIntegerValidator },
	ide_pata: { type: Number, min: 0, required: true, validate: positiveIntegerValidator },
	floppy: { type: Number, min: 0, required: true, validate: positiveIntegerValidator }
}, { _id: false })

const videoSchema = new mongoose.Schema({
	vga: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	dvi: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	hdmi: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
	displayport: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator }
}, { _id: false })

const moboSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, uppercase: true, trim: true, required: true },
		model: { type: String, uppercase: true, trim: true, required: true },
		socket: { type: String, uppercase: true, trim: true, required: true },
		form_factor: { type: String, uppercase: true, trim: true, enum: MOBO_FORM_FACTOR, required: true },
		chipset: { type: String, uppercase: true, trim: true, required: true },
		ram_type: { type: String, uppercase: true, trim: true, enum: RAM_TYPE, required: true },
		ram_slots: { type: Number, required: true, min: 2, validate: positiveIntegerValidator },
		internal_connectors: {
			storage: storageConnectorsSchema,
			expansion_slots: expansionSlotsSchema,
			usb_headers: usbHeaderesSchema
		},
		rear_io: {
			usb_ports: rearIOSchema,
			ethernet: {
				_id: false,
				speed: { type: Number, required: true, validate: positiveIntegerValidator },
				quantity: { type: Number, min: 1, required: true, validate: positiveIntegerValidator }
			},
			video: videoSchema,
			audio_jacks: { type: Number, min: 0, default: 3, validate: positiveIntegerValidator }
		},
		wireless: {
			wifi: { type: String, uppercase: true, trim: true, required: true, enum: WIFI_STANDARD, default: 'NONE' },
			bluetooth: { type: Boolean, required: true, default: false }
		},
		// Price en céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
		slug: { type: String, unique: true, index: true },
		// necesario para el soft delete
		active: { type: Boolean, default: true, select: false },
	}, { timestamps: true }
)

// Middleware para generar el Slug
moboSchema.pre('validate', function () {
	if (!this.isModified('manufacturer') && !this.isModified('model')) return

	const baseString = `${this.manufacturer} ${this.model}`

	this.slug = baseString
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/[\s-]+/g, '-')
		.replace(/^-+|-+$/g, '')
})

moboSchema.pre(/^find/, function () {
	this.find({ active: { $ne: false } })
})

const Mobo = mongoose.model('Mobo', moboSchema)

export default Mobo

/* Ejemplo json mobo:
	{
		"manufacturer": " asrock ",
		"model": "B650M Pro RS WiFi",
		"socket": "am5",
		"form_factor": "micro-atx",
		"chipset": "b650",
		"ram_type": "ddr5",
		"ram_slots": 4,
		"internal_connectors": {
			"storage": {
				"sata_3gb": 0,
				"sata_6gb": 4,
				"m2_nvme": 3,
				"m2_sata": 0,
				"ide_pata": 0,
				"floppy": 0
			},
			"expansion_slots": {
				"x16": 1,
				"x8": 0,
				"x4": 1,
				"x1": 0,
				"pci_legacy": 0,
				"agp_slot": 0
			},
			"usb_headers": {
				"usb2": 2,
				"usb3_gen1": 1,
				"usb3_gen2": 1,
				"usb3_gen2x2": 0,
				"serial_header": 1
			}
		},
		"rear_io": {
			"usb_ports": {
				"ps2": 1,
				"serial_com": 0,
				"usb2": 4,
				"usb3_gen1": 2,
				"usb3_gen2": 1,
				"usb3_gen2x2": 1
			},
			"ethernet": {
				"speed": 2500,
				"quantity": 1
			},
			"video": {
				"vga": 0,
				"dvi": 0,
				"hdmi": 1,
				"displayport": 1
			},
			"audio_jacks": 3
		},
		"wireless": {
			"wifi": "wi-fi 6e",
			"bluetooth": true
		},
		"price": 15490,
		"partType": "69c3ff0e60737a8c6356969e"
	}
*/
