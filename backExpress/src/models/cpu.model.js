import mongoose from 'mongoose'
import { CPU_MANUFACTURER } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const cpuSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, uppercase: true, trim: true, enum: CPU_MANUFACTURER, required: [true, 'El fabricante es obligatorio'] },
		model: { type: String, uppercase: true, trim: true, required: true },
		series: { type: String, uppercase: true, trim: true, required: true },
		microarchitecture: { type: String, uppercase: true, trim: true, required: true },
		socket: { type: String, uppercase: true, trim: true, required: true },
		// Int
		core_count: { type: Number, min: 1, required: true },
		thread_count: { type: Number, min: 1, required: true },
		// MegaHertz
		base_freq: { type: Number, required: true, validate: positiveIntegerValidator },
		// MegaHertz
		boost_freq: { type: Number, required: false, validate: positiveIntegerValidator },
		// MegaBytes
		l2_cache: { type: Number, required: true, validate: positiveIntegerValidator },
		// MegaBytes
		l3_cache: { type: Number, required: true, validate: positiveIntegerValidator },
		// Watts
		tdp: { type: Number, required: true, validate: positiveIntegerValidator },
		hasIntegrated: { type: Boolean, required: true },
		integrated_graphics: {
			type: String, uppercase: true, trim: true, required: [
				function () { return this.hasIntegrated === true },
				'Si indicas que tiene integrada, debes especificar el modelo (ej: UHD 770)'
			],
			default: function () { return this.hasIntegrated ? undefined : null }
		},
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
		// necesario para el soft delete
		active: { type: Boolean, default: true, select: false }
	}, { timestamps: true }
)

const Cpu = mongoose.model('CPU', cpuSchema)

cpuSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } })
	next()
})

export default Cpu

/* Ejemplo json cpu:
	{
		"manufacturer": " intel ",
		"model": "Core i9-13900K",
		"series": "Core i9",
		"microarchitecture": "Raptor Lake",
		"socket": "lga1700",
		"core_count": 24,
		"thread_count": 32,
		"base_freq": 3000,
		"boost_freq": 5800,
		"l2_cache": 32,
		"l3_cache": 36,
		"tdp": 125,
		"hasIntegrated": true,
		"integrated_graphics": "uhd graphics 770",
		"price": 58990,
		"partType": "69c3ff0e60737a8c6356969c"
	}
*/
