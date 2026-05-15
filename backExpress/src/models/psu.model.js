import mongoose from 'mongoose'
import { PSU_TYPE, EFF_RATING, MODULAR, CONNECTORS } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const psuConnectorSchema = new mongoose.Schema({
	atx_24pin: { type: Number, default: 1, validate: positiveIntegerValidator },
	eps_8pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
	eps_4pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
	pcie_16pin_12vhpwr: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
	pcie_8pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
	pcie_6plus2pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
	pcie_6pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
	sata: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
	molex_4pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator }
}, { _id: false })

const psuSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, uppercase: true, trim: true, required: true },
		model: { type: String, uppercase: true, trim: true, required: true },
		psu_type: { type: String, uppercase: true, trim: true, enum: PSU_TYPE, required: true },
		wattage: { type: Number, required: true, min: 1, validate: positiveIntegerValidator },
		eff_rating: { type: String, uppercase: true, trim: true, enum: EFF_RATING, required: true },
		modular: { type: String, uppercase: true, trim: true, enum: MODULAR, required: true },
		connectors: psuConnectorSchema,
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
		slug: { type: String, unique: true, index: true },
		// necesario para el soft delete
		active: { type: Boolean, default: true, select: false },
	}, { timestamps: true }
)

// Middleware para generar el Slug (Fabricante + Modelo + Wattage)
psuSchema.pre('validate', function () {
	if (!this.isModified('manufacturer') && !this.isModified('model') && !this.isModified('wattage')) return

	// Añadimos el wattage al final para diferenciar modelos iguales con distinta potencia
	const baseString = `${this.manufacturer} ${this.model} ${this.wattage}w`

	this.slug = baseString
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/[\s-]+/g, '-')
		.replace(/^-+|-+$/g, '')
})

psuSchema.pre(/^find/, function () {
	const query = this.getQuery()
	if (!query._id) {
		this.where({ active: { $ne: false } })
	}
})

const Psu = mongoose.model('PSU', psuSchema)

export default Psu

/* Ejemplo json psu:
	{
		"manufacturer": " be quiet! ",
		"model": "Pure Power 12 M",
		"psu_type": "atx",
		"wattage": 850,
		"eff_rating": "80+ gold",
		"modular": "full",
		"connectors": {
			"atx_24pin": 1,
			"eps_8pin": 1,
			"eps_4pin": 1,
			"pcie_16pin_12vhpwr": 1,
			"pcie_8pin": 0,
			"pcie_6plus2pin": 4,
			"pcie_6pin": 0,
			"sata": 6,
			"molex_4pin": 2
		},
		"price": 13990,
		"partType": "69c3ff0e60737a8c635696a0"
	}
*/
