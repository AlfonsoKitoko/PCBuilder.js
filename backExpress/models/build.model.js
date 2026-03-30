import mongoose from 'mongoose'
import { nonEmptyArrayValidator } from '../validators/array.validator.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const buildSchema = new mongoose.Schema({
	//_id es autogenerado
	name: { type: String, required: true, },
	description: { type: String, required: false },
	mobo: { type: mongoose.Schema.Types.ObjectId, ref: 'Mobo', required: true },
	cpu: { type: mongoose.Schema.Types.ObjectId, ref: 'CPU', required: true, },
	// Array objetos, puede tener varios módulos de RAM
	ram: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RAM', required: true, }],
		validate: nonEmptyArrayValidator('Debe tener al menos un módulo de RAM')
	},
	gpu: { type: mongoose.Schema.Types.ObjectId, ref: 'GPU', required: false, },
	psu: { type: mongoose.Schema.Types.ObjectId, ref: 'PSU', required: true, },
	case: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true, },
	os: { type: mongoose.Schema.Types.ObjectId, ref: 'OS', required: false, },
	// Array objetos, puede tener varios discos duros
	storage: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Storage', required: true }],
		validate: nonEmptyArrayValidator('Debe tener al menos un disco')
	},
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	// Céntimos
	totalPrice: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
},
	{ timestamps: true }
)
// Índice compuesto para evitar builds con mismo nombre por usuario
buildSchema.index({ name: 1, owner: 1 }, { unique: true })

const Build = mongoose.model('Build', buildSchema)

export default Build

/* Ejemplo Build:
- name: 'Mi primera build'
- description: 'Build gaming equilibrada con CPU AMD y GPU RTX'
- mobo: 'MSI MAG B550 Tomahawk' // referencia a MOBO
- cpu: 'AMD Ryzen 5 5600X'       // referencia a CPU
- ram:
		- 'Corsair Vengeance LPX 16GB DDR4' // módulo 1
		- 'Corsair Vengeance LPX 16GB DDR4' // módulo 2
- gpu: 'MSI RTX 4070 Ventus 3X OC'    // referencia a GPU
- psu: 'Corsair RM750x 750W'           // referencia a PSU
- case: 'NZXT H510'                    // referencia a Case
- os: 'Windows 11 Home'                // referencia a OS
- storage:
		- 'Samsung 870 EVO 500GB SSD'     // referencia a Storage 1
		- 'WD Blue 1TB HDD'                // referencia a Storage 2
- owner: 'Usuario_12345'              // referencia a User
- totalPrice: 1799.99 €               // suma de todos los componentes
*/