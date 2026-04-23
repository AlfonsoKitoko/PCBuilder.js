import mongoose from 'mongoose'
import { nonEmptyArrayValidator } from '../validators/array.validator.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const buildSchema = new mongoose.Schema({
	//_id es autogenerado
	name: { type: String, uppercase: true, trim: true, required: true, },
	description: { type: String, uppercase: true, trim: true, required: false },
	cpu: { type: mongoose.Schema.Types.ObjectId, ref: 'CPU', required: true, },
	mobo: { type: mongoose.Schema.Types.ObjectId, ref: 'Mobo', required: true },
	// Array objetos, puede tener varios módulos de RAM
	ram: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RAM', required: true, }],
		validate: nonEmptyArrayValidator('Debe tener al menos un módulo de RAM')
	},
	// Array objetos, puede tener varios discos duros
	storage: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Storage', required: true }],
		validate: nonEmptyArrayValidator('Debe tener al menos un disco')
	},
	gpu: { type: mongoose.Schema.Types.ObjectId, ref: 'GPU', required: false, },
	case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true, },
	psu: { type: mongoose.Schema.Types.ObjectId, ref: 'PSU', required: true, },
	os: { type: mongoose.Schema.Types.ObjectId, ref: 'OS', required: false, },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	// Céntimos
	totalPrice: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
	slug: { type: String, unique: true, index: true }
}, { timestamps: true }
)

// Middleware para generar el Slug de la Build
buildSchema.pre('validate', function () {
	if (!this.isModified('name')) return

	// Generamos slug inicial
	let baseSlug = this.name
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/[\s-]+/g, '-')
		.replace(/^-+|-+$/g, '')

	// OPCIONAL: Podrías añadir un sufijo aleatorio corto si quieres permitir nombres duplicados
	// entre distintos usuarios, o simplemente confiar en el unique: true.
	this.slug = baseSlug
})

const Build = mongoose.model('Build', buildSchema)

export default Build

/* Ejemplo json Build:
	{
		"name": "estudio produccion pro",
		"description": "configuracion optimizada con dual-channel y separacion de s.o. y librerias.",
		"cpu": "69c3ff0e60737a8c6356969a",
		"mobo": "69c3ff0e60737a8c6356969e",
		"ram": [
			"69c3ff0e60737a8c6356969d",
			"69c3ff0e60737a8c6356969d"
		],
		"storage": [
			"69c3ff0e60737a8c63569611",
			"69c3ff0e60737a8c63569622"
		],
		"gpu": "69c3ff0e60737a8c6356969f",
		"psu": "69c3ff0e60737a8c6356969c",
		"case": "69c3ff0e60737a8c63569690",
		"os": "69c3ff0e60737a8c6356969b",
		"owner": "69c3ff0e60737a8c63569999",
		"totalPrice": 245075
	}
*/