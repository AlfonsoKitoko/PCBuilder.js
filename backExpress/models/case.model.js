const mongoose = require("mongoose")
const { FORM_FACTOR, CASE_TYPE } = require("../constants/index.constant")
const { positiveIntegerValidator } = require("../validators/integer.validator")

const caseSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, required: true },
		model: { type: String, required: true },
		case_type: { type: String, enum: CASE_TYPE, required: true },
		volume: { type: Number, min: 0, required: true },
		form_factor: { type: String, enum: FORM_FACTOR, required: true },
		power_supply: { type: Boolean, required: true },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: "Part", required: true }
	},
	{ timestamps: true }
)
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
export const Case = mongoose.model("Case", caseSchema)