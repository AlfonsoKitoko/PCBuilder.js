import mongoose from 'mongoose'
import { RAM_TYPE, RAM_SIZE } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const ramSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, required: true },
		model: { type: String, required: true },
		modules: {
			size: {
				type: String, required: true, enum: RAM_SIZE
			},
			quantity: { type: Number, required: true, validate: positiveIntegerValidator }
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

const Ram = mongoose.model("RAM", ramSchema)

export default Ram

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
