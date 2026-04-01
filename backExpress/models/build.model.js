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
	// necesario para el soft delete
	active: { type: Boolean, default: true, select: false }
}, { timestamps: true }
)
// Índice compuesto para evitar builds con mismo nombre por usuario
buildSchema.index({ name: 1, owner: 1 }, { unique: true })

const Build = mongoose.model('Build', buildSchema)

buildSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } })
	next()
})

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