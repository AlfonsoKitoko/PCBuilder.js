import 'dotenv/config'
import mongoose from 'mongoose'
import logger from '../config/logger.config.js'
const mongoUri = process.env.MONGODB_ATLAS

export const conexMongoDB = async () => {
	try {
		if (!mongoUri) {
			throw new Error('La variable MONGODB_ATLAS no está definida en el .env')
		}

		await mongoose.connect(mongoUri)

		console.log('++ MongoDB Connected Successfully ++')
		logger.app.info('Éxito conexión a MongoDB')
	} catch (err) {
		console.error('-- ERROR connecting to MongoDB --')
		console.error(err)

		logger.err.error('Error conexión a MongoDB:', err)
		process.exit(1)
	}
}