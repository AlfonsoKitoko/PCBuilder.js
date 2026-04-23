import mongoose from 'mongoose'
import { GPU_TYPE, SYNC_TYPE, INTERFACE_TYPE, EXTERNAL_POWER, GDDR_TYPE } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const gpuPortsSchema = new mongoose.Schema({
	vga: { type: Number, min: 0, default: 0 },
	dvi: { type: Number, min: 0, default: 0 },
	hdmi: { type: Number, min: 0, default: 0 },
	displayport: { type: Number, min: 0, default: 0 },
}, { _id: false })

const gpuSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, uppercase: true, trim: true, required: true },
		series: { type: String, uppercase: true, trim: true, required: true },
		gpu_type: { type: String, uppercase: true, trim: true, enum: GPU_TYPE, required: true },
		// MegaHertz
		base_freq: { type: Number, required: true, validate: positiveIntegerValidator },
		// MegaHertz
		boost_freq: { type: Number, required: true, validate: positiveIntegerValidator },
		memory: { type: Number, required: true, validate: positiveIntegerValidator },
		memory_type: { type: String, uppercase: true, trim: true, enum: GDDR_TYPE, required: true },
		interface: { type: String, uppercase: true, trim: true, enum: INTERFACE_TYPE, required: true, default: 'PCIE X16' },
		frame_sync: { type: String, uppercase: true, trim: true, enum: SYNC_TYPE, required: true },
		// Watts
		tdp: { type: Number, required: true, validate: positiveIntegerValidator },
		ports: gpuPortsSchema,
		external_power: { type: String, uppercase: true, trim: true, enum: EXTERNAL_POWER, required: true },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
		slug: { type: String, unique: true, index: true },
		// necesario para el soft delete
		active: { type: Boolean, default: true, select: false },
	}, { timestamps: true }
)

// Middleware para generar el Slug (Ensamblador + Serie/Modelo)
gpuSchema.pre('validate', function () {
	if (!this.isModified('manufacturer') && !this.isModified('series')) return

	const baseString = `${this.manufacturer} ${this.series}`

	this.slug = baseString
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/[\s-]+/g, '-')
		.replace(/^-+|-+$/g, '')
})

gpuSchema.pre(/^find/, function () {
	this.find({ active: { $ne: false } })
})

const Gpu = mongoose.model('GPU', gpuSchema)

export default Gpu

/* Ejemplo json gpu:
	{
		"manufacturer": " msi ",
		"series": "geforce rtx 4070 ti super ventus 3x",
		"gpu_type": "nvidia",
		"base_freq": 2340,
		"boost_freq": 2640,
		"memory": 16,
		"memory_type": "gddr6x",
		"interface": "pcie x16",
		"frame_sync": "nvidia g-sync",
		"tdp": 285,
		"ports": {
			"vga": 0,
			"dvi": 0,
			"hdmi": 1,
			"displayport": 3
		},
		"external_power": "1 X PCIE 16-PIN 12VHPWR",
		"price": 89990,
		"partType": "69c3ff0e60737a8c6356969d"
	}
*/