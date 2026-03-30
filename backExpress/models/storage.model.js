import mongoose from 'mongoose'
import { positiveIntegerValidator } from '../validators/integer.validator.js'
import { FORM_FACTOR, STORAGE_TYPE, INTERFACE } from '../constants/index.constant.js'

const storageSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, required: true },
		model: { type: String, required: true },
		// GigaBytes
		capacity: { type: String, required: true },
		type: { type: String, required: true, enum: STORAGE_TYPE },
		form_factor: { type: String, required: true, enum: FORM_FACTOR },
		interface: { type: String, required: true, enum: INTERFACE },
		cache: { type: Number, required: true, validate: positiveIntegerValidator },
		nvme: { type: Boolean, required: true, default: false },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true }
	},
	{ timestamps: true }
)

const Storage = mongoose.model('Storage', storageSchema)

export default Storage

/* Ejemplo storage:
	- manufacturer: Samsung
	- model: 870 EVO
	- capacity: 500 GB
	- type: SSD
	- cache: 512 MB
	- form_factor: 2.5'
	- interface: SATA 6.0 GB/s
	- nvme: No
	- price: 55.98 €
	- partType: storage
*/
