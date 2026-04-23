import mongoose from 'mongoose'
import { OS_MODE } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const osSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, uppercase: true, trim: true, required: true },
		version: { type: String, uppercase: true, trim: true, required: true },
		edition: { type: String, uppercase: true, trim: true, required: true },
		mode: { type: String, uppercase: true, trim: true, enum: OS_MODE, required: true },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
		slug: { type: String, unique: true, index: true },
		// necesario para el soft delete
		active: { type: Boolean, default: true, select: false },
	}, { timestamps: true }
)

// Middleware para generar el Slug (Fabricante + Versión + Edición)
osSchema.pre('validate', function () {
	if (!this.isModified('manufacturer') && !this.isModified('version') && !this.isModified('edition')) return

	// Combinamos los tres campos para evitar colisiones entre Home/Pro
	const baseString = `${this.manufacturer} ${this.version} ${this.edition}`

	this.slug = baseString
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/[\s-]+/g, '-')
		.replace(/^-+|-+$/g, '')
})

osSchema.pre(/^find/, function () {
	this.find({ active: { $ne: false } })
})

const Os = mongoose.model('OS', osSchema)

export default Os

/* Ejemplo json os:
	{
		"manufacturer": " microsoft ",
		"version": "windows 11",
		"edition": "home",
		"mode": "64-bit",
		"price": 11990,
		"partType": "69c3ff0e60737a8c6356969f"
	}
*/