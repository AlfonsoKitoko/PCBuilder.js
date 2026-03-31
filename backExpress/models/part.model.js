import mongoose from 'mongoose'
import { PC_PARTS } from '../constants/index.constant.js'

const partSchema = new mongoose.Schema(
	{
		// _id autogenerado
		name: {
			type: String,
			uppercase: true,
			trim: true,
			unique: true,
			enum: PC_PARTS,
			required: true
		},
	},
	{
		timestamps: true,
		versionKey: false
	}
)

const Part = mongoose.model('Part', partSchema)

export default Part

/* ejemplo json part:
	{
		"name": "cpu"
	}
*/