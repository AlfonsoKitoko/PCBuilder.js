import mongoose from 'mongoose'
import { MOBO_FORM_FACTOR, CASE_TYPE } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const frontPanelSchema = new mongoose.Schema({
	usb2TypA: { type: Number, min: 0, default: 0 },
	usb3gen1A: { type: Number, min: 0, default: 0 },
	usb32gen2x2C: { type: Number, min: 0, default: 0 },
	usb3gen2C: { type: Number, min: 0, default: 0 },
	usb3gen1C: { type: Number, min: 0, default: 0 }
}, { _id: false })

const internalBaysSchema = new mongoose.Schema({
	int35: { type: Number, min: 0, default: 0 },
	int25: { type: Number, min: 0, default: 0 }
}, { _id: false })

const caseSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, uppercase: true, trim: true, required: true },
		model: { type: String, uppercase: true, trim: true, required: true },
		case_type: { type: String, uppercase: true, trim: true, enum: CASE_TYPE, required: true },
		volume: { type: Number, min: 0, required: true },
		form_factor: { type: String, uppercase: true, trim: true, enum: MOBO_FORM_FACTOR, required: true },
		front_panel: frontPanelSchema,
		internal_bays: internalBaysSchema,
		power_supply: { type: Boolean, required: true },
		color: { type: String, uppercase: true, trim: true, required: false },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true }
	},
	{ timestamps: true }
)
const Case = mongoose.model('Case', caseSchema)

export default Case

/* Ejemplo json case:
	{
		"manufacturer": " fractal design ",
		"model": "North Charcoal Black",
		"case_type": "mid-tower",
		"volume": 45,
		"form_factor": "atx",
		"front_panel": {
			"usb2TypA": 0,
			"usb3gen1A": 2,
			"usb32gen2x2C": 1,
			"usb3gen2C": 0,
			"usb3gen1C": 0
		},
		"internal_bays": {
			"int35": 2,
			"int25": 2
		},
		"power_supply": false,
		"color": "black / walnut",
		"price": 14995,
		"partType": "69c3ff0e60737a8c6356969b"
	}
*/