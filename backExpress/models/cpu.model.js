import mongoose from 'mongoose'
import { CPU_MANUFACTURER } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const cpuSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, enum: CPU_MANUFACTURER, required: true },
		model: { type: String, required: true },
		series: { type: String, required: true },
		microarchitecture: { type: String, required: true },
		socket: { type: String, required: true },
		core_count: { type: Number, required: true },
		thread_count: { type: Number, required: true },
		// GigaHertz
		base_freq: { type: Number, required: true },
		// GigaHertz
		boost_freq: { type: Number, required: false },
		// MegaBytes
		l2_cache: { type: Number, required: true, validate: positiveIntegerValidator },
		// MegaBytes
		l3_cache: { type: Number, required: true, validate: positiveIntegerValidator },
		// Watts
		tdp: { type: Number, required: true },
		hasIntegrated: { type: Boolean, required: true },
		integrated_graphics: { type: String, required: false },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true }
	},
	{ timestamps: true }
)

const Cpu = mongoose.model('CPU', cpuSchema)
export default Cpu

/* Ejemplo cpu:
	- manufacturer: AMD
	- model: 9800X3D
	- series: Ryzen 7
	- microarchitecture: Zen 5
	- socket: AM5
	- core_count: 8
	- thread_count: 16
	- base_freq: 4.7 GHz
	- boost_freq: 5.2 GHz
	- l2_cache: 8 MB
	- l3_cache: 96 MB
	- tdp: 120 W
	- hasIntegrated: true
	- integrated_graphics: Radeon
	- price: 449.99 €
	- partType: cpu
*/
