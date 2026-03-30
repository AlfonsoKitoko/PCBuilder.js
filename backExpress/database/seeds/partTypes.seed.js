import 'dotenv/config'
import mongoose from 'mongoose'

import Part from '../../models/part.model.js'

const seedParts = async () => {
	try {
		const uri = process.env.MONGODB_ATLAS
		if (!uri) throw new Error('MONGODB_ATLAS no definida en .env')

		await mongoose.connect(new URL(uri).href)
		console.log('++ Conectado para crear categorías ++')

		// 1. Limpiar categorías existentes
		await Part.deleteMany({})
		console.log('-- Colección Part vaciada --')

		// 2. Insertar las categorías definidas en tus constantes
		const categories = [
			{ name: 'CASE' },
			{ name: 'CPU' },
			{ name: 'GPU' },
			{ name: 'MOTHERBOARD' },
			{ name: 'OS' },
			{ name: 'PSU' },
			{ name: 'RAM' },
			{ name: 'STORAGE' }
		]

		await Part.insertMany(categories)
		console.log('++ Categorías (Parts) creadas con éxito ++')

		await mongoose.connection.close()
		process.exit(0)
	} catch (error) {
		console.error('!! Error en Part Seed !!', error)
		process.exit(1)
	}
}

seedParts()