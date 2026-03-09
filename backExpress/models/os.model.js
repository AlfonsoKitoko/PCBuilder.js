const mongoose = require("mongoose")
const { OS_MODE } = require("../constants/index.constant")
const { positiveIntegerValidator } = require("../validators/integer.validator")

const osSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, required: true },
		version: { type: String, required: true },
		edition: { type: String, required: true },
		mode: { type: String, required: true, enum: OS_MODE },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: "Part", required: true }
	},
	{ timestamps: true }
)

/* Ejemplo os:
	- manufacturer: Microsoft
	- version: Windows 11
	- edition: Home Edition
	- mode: 64-bit
	- price: 119,99 €
	- partType: os
*/

export const Os = mongoose.model("OS", osSchema)