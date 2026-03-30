import mongoose from 'mongoose'
import { GPU_TYPE, SYNC_TYPE, INTERFACE_TYPE, EXTERNAL_POWER, GDDR_TYPE } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const gpuSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, required: true },
		series: { type: String, required: true },
		gpu_type: { type: String, enum: GPU_TYPE, required: true },
		// GigaHertz
		base_freq: { type: Number, required: true },
		// GigaHertz
		boost_freq: { type: Number, required: true },
		memory: { type: Number, required: true },
		memory_type: { type: String, enum: GDDR_TYPE, required: true },
		interface: { type: String, enum: INTERFACE_TYPE, required: true, default: 'PCIe x16' },
		frame_sync: { type: String, enum: SYNC_TYPE, required: true },
		// Watts
		tdp: { type: Number, required: true },
		ports: {
			vga: { type: Number, min: 0, default: 0 },
			dvi: { type: Number, min: 0, default: 0 },
			hdmi: { type: Number, min: 0, default: 0 },
			displayport: { type: Number, min: 0, default: 0 },
		},
		external_power: { type: String, enum: EXTERNAL_POWER, required: true },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true }
	},
	{ timestamps: true }
)
const Gpu = mongoose.model('GPU', gpuSchema)

export default Gpu

/* Ejemplo gpu:
	- manufacturer: Gigabyte
	- series: RTX 40 Series
	- model: RTX 4070 Windforce OC
	- gpu_type: NVIDIA
	- base_freq: 1.92 GHz
	- boost_freq: 2.48 GHz
	- interface: PCIe x16
	- frame_sync: G-Sync
	- tdp: 200 W
	- ports:
		- vga: 0
		- dvi: 0
		- hdmi: 2
		- displyport: 1
	- price: 599.99 €
	- partType: gpu
*/