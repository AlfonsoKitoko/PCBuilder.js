import mongoose from 'mongoose'
import { MOBO_FORM_FACTOR, CASE_TYPE } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const caseSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, required: true },
		model: { type: String, required: true },
		case_type: { type: String, enum: CASE_TYPE, required: true },
		volume: { type: Number, min: 0, required: true },
		form_factor: { type: String, enum: MOBO_FORM_FACTOR, required: true },
		front_panel: {
			usb2TypA: { type: Number, min: 0, default: 0 },
			usb3gen1A: { type: Number, min: 0, default: 0 },
			usb32gen2x2C: { type: Number, min: 0, default: 0 },
			usb3gen2C: { type: Number, min: 0, default: 0 },
			usb3gen1C: { type: Number, min: 0, default: 0 }
		},
		internal_bays: {
			int25: { type: Number, min: 0, default: 0 },
			int35: { type: Number, min: 0, default: 0 }
		},
		power_supply: { type: Boolean, required: true },
		color: { type: String, required: false },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true }
	},
	{ timestamps: true }
)
const Case = mongoose.model('Case', caseSchema)

export default Case

/* Ejemplo case:
	- manufacturer: Corsair
	- model: 3500X
	- type: Mid-Tower
	- volume: 55.862  L
	- form_factor: EATX
	- power_supply: no
	- price: 101.99 €
	- partType: case
*/