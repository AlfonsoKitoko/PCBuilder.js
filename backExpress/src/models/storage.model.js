import mongoose from 'mongoose'
import { positiveIntegerValidator } from '../validators/integer.validator.js'
import { FORM_FACTOR, STORAGE_TYPE, INTERFACE } from '../constants/index.constant.js'

const storageSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, uppercase: true, trim: true, required: true },
		model: { type: String, uppercase: true, trim: true, required: true },
		// GigaBytes
		capacity: { type: String, uppercase: true, trim: true, required: true },
		type: { type: String, uppercase: true, trim: true, enum: STORAGE_TYPE, required: true },
		form_factor: { type: String, uppercase: true, trim: true, enum: FORM_FACTOR, required: true },
		interface: { type: String, uppercase: true, trim: true, enum: INTERFACE, required: true },
		cache: { type: Number, required: true, validate: positiveIntegerValidator },
		nvme: { type: Boolean, required: true, default: false },
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
		// necesario para el soft delete
		active: { type: Boolean, default: true, select: false }
	}, { timestamps: true }
)

storageSchema.pre(/^find/, function () {
	this.find({ active: { $ne: false } })
})

const Storage = mongoose.model('Storage', storageSchema)

export default Storage

/* Ejemplo json storage:
	{
		"manufacturer": " samsung ",
		"model": "990 Pro",
		"capacity": "2tb",
		"type": "ssd",
		"form_factor": "m.2",
		"interface": "M.2 PCIE 4.0 X4",
		"cache": 2048,
		"nvme": true,
		"price": 18990,
		"partType": "69c3ff0e60737a8c635696a2"
	}
*/
