require("dotenv").config()
const mongoose = require("mongoose")

exports.conexMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_ATLAS)

		console.log("Éxito conexión a MongoDB")
	} catch (err) {

		console.error("Error conexión a MongoDB:", err)

		process.exit(1)
	}
}