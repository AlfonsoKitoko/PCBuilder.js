import mongoose from 'mongoose'
import { PC_PARTS } from '../constants/index.constant.js'

const partSchema = new mongoose.Schema(
	{
		// _id autogenerado
		name: { type: String, required: true, uppercase: true, enum: PC_PARTS }
	}
)

const Part = mongoose.model('Part', partSchema)

export default Part
