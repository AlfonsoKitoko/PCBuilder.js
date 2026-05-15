import mongoose from 'mongoose'
import { positiveIntegerValidator } from '../validators/integer.validator.js'
import { FORM_FACTOR, STORAGE_TYPE, INTERFACE } from '../constants/index.constant.js'

const storageSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, uppercase: true, trim: true, required: true },
		model: { type: String, uppercase: true, trim: true, required: true },
		// GigaBytes (GB)
		capacity: { type: Number, uppercase: true, trim: true, required: true },
		type: { type: String, uppercase: true, trim: true, enum: STORAGE_TYPE, required: true },
		form_factor: { type: String, uppercase: true, trim: true, enum: FORM_FACTOR, required: true },
		interface: { type: String, uppercase: true, trim: true, enum: INTERFACE, required: true },
		// MegaBytes (MB)
		cache: { type: Number, required: true, validate: positiveIntegerValidator },
		nvme: { type: Boolean, required: true, default: false },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
		slug: { type: String, unique: true, index: true },
		// necesario para el soft delete
		active: { type: Boolean, default: true, select: false },
	}, { timestamps: true }
)

// Middleware para generar el Slug (Fabricante + Modelo + Capacidad + NVMe?)
storageSchema.pre('validate', function () {
	if (!this.isModified('manufacturer') && !this.isModified('model') && !this.isModified('capacity')) return

	// Si es NVMe, lo añadimos para que la URL sea más descriptiva
	const nvmeTag = this.nvme ? 'nvme' : ''
	const baseString = `${this.manufacturer} ${this.model} ${this.capacity} ${nvmeTag}`

	this.slug = baseString
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/[\s-]+/g, '-')
		.replace(/^-+|-+$/g, '')
})

storageSchema.pre(/^find/, function () {
	const query = this.getQuery()
	if (!query._id) {
		this.where({ active: { $ne: false } })
	}
})

const Storage = mongoose.model('Storage', storageSchema)

export default Storage

/* Ejemplo json storage:
	{
		"manufacturer": " samsung ",
		"model": "990 Pro",
		"capacity": "2000",
		"type": "ssd",
		"form_factor": "m.2",
		"interface": "M.2 PCIE 4.0 X4",
		"cache": 2048,
		"nvme": true,
		"price": 18990,
		"partType": "69c3ff0e60737a8c635696a2"
	}
*/
