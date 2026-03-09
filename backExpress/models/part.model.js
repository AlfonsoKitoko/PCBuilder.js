const { PC_PARTS } = require("../constants/index.constant")
const mongoose = require("mongoose")

const partSchema = new mongoose.Schema(
	{
		// _id autogenerado
		name: { type: String, required: true, uppercase: true, enum: PC_PARTS }
	}
)

export const Part = mongoose.model("Part", partSchema)