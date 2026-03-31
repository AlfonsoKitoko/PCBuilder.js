import mongoose from 'mongoose'
import { RAM_TYPE, RAM_SIZE } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'
import { nonEmptyArrayValidator } from '../validators/array.validator.js'

const ramModulesSchema = new mongoose.Schema({
	size: { type: String, uppercase: true, trim: true, enum: RAM_SIZE, required: true },
	quantity: { type: Number, required: true, min: 1, validate: positiveIntegerValidator }
}, { _id: false })

const ramSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, uppercase: true, trim: true, required: true },
		model: { type: String, uppercase: true, trim: true, required: true },
		ram_type: { type: String, uppercase: true, trim: true, enum: RAM_TYPE, required: true },
		modules: { type: [ramModulesSchema], required: true, validate: nonEmptyArrayValidator('Debe tener al menos un módulo de RAM') },
		// MegaHertz
		speed: { type: Number, required: true, validate: positiveIntegerValidator },
		// CAS Latency
		cas_latency: { type: Number, required: true, validate: positiveIntegerValidator },
		// Voltaje
		voltage: { type: Number, required: true, validate: positiveIntegerValidator },
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

/* Ejemplo json ram:
	{
		"manufacturer": " corsair ",
		"model": "vengeance lpx mixed kit",
		"ram_type": "ddr4",
		"modules": [
			{
				"size": "16gb",
				"quantity": 1
			},
			{
				"size": "8gb",
				"quantity": 1
			}
		],
		"speed": 3200,
		"cas_latency": 16,
		"voltage": 135,
		"price": 8550,
		"partType": "69c3ff0e60737a8c635696a1"
	}
*/
