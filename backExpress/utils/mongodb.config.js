require("dotenv").config()
const mongoose = require("mongoose")

exports.conexMongoDB = async () => {
	return mongoose.connect(process.env.MONGODB_CONEXSTRING)
}