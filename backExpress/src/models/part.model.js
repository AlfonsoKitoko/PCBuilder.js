import mongoose from 'mongoose'
import { PC_PARTS } from '../constants/index.constant.js'

const partSchema = new mongoose.Schema(
	{
		// _id autogenerado
		name: { type: String, uppercase: true, trim: true, unique: true, enum: PC_PARTS, required: true },
		slug: { type: String, unique: true, index: true }
	}, { timestamps: true, versionKey: false }
)

// Middleware para generar el Slug basado en el nombre de la categoría
partSchema.pre('validate', function () {
	if (!this.isModified('name')) return

	this.slug = this.name
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/[\s-]+/g, '-')
		.replace(/^-+|-+$/g, '')

})

const Part = mongoose.model('Part', partSchema)

export default Part

/* ejemplo json part:
	{ "name": "cpu" }
*/