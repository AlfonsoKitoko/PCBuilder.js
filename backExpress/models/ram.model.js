const mongoose = require("mongoose")
const { RAM_TYPE, RAM_SIZE } = require("../constants/index.constant")
const { positiveIntegerValidator } = require("../validators/integer.validator")

const ramSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, required: true },
		model: { type: String, required: true },
		modules: {
			type: {
				size: {
					type: String, required: true, enum: RAM_SIZE
				},
				quantity: { type: Number, required: true, validate: positiveIntegerValidator }
			},
			required: true
		},
		ram_type: { type: String, required: true, enum: RAM_TYPE },
		// Céntimos
		price: {
			type: Number, required: true, min: 0, validate: positiveIntegerValidator
		},
		partType: { type: mongoose.Schema.Types.ObjectId, ref: "Part", required: true }
	},
	{ timestamps: true }
)

/* Ejemplo ram:
	- manufacturer: Crucial
	- model: Pro Overclocking
	- modules:
		- size: 16 GB
		- quantity: 2
	- ram_type: DDR5
	- price: 101.99 €
	- partType: ram
*/

export const Ram = mongoose.model("RAM", ramSchema)