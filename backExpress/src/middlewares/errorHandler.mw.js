import logger from '../config/logger.config.js'
import * as apiResponse from '../utils/apiResponse.js'

export const errorHandler = (err, req, res, next) => {
	let status = err.status || 500
	let message = err.message || 'Internal Servitor Error'
	let errors = err.errors || []

	const path = req.originalUrl || ''

	const isImageRequest = path.startsWith('/img/') || /\.(jpg|jpeg|png|gif|webp|svg)$/.test(path)

	// 1. Errores de Validación de Mongoose (como el Regex del Email)
	if (err.name === 'ValidationError') {
		status = 400
		// Si es Mongoose, mapeamos los errores a un array de mensajes
		errors = Object.values(err.errors).map(e => e.message)
		message = errors.join(', ')
	}

	// 2. Errores de la base de datos (Claves duplicadas e IDs inválidos)
	if (err.name === 'CastError') {
		status = 400
		message = `ID de MongoDB inválido: ${err.value}`
	}

	if (err.name === 'MongoServerError' || err.code === 11000) {
		if (err.code === 11000) {
			status = 409
			const field = Object.keys(err.keyValue || {})[0]
			message = `El ${field} ya está en uso`
		} else {
			status = 400
		}
	}

	// 3. Registro en logs condicional para imágenes
	if (isImageRequest && status === 404) {
		logger.assets.info(`Imagen no encontrada (404): ${path}`)
	} else {
		logger.err.error(`Error Handler(${status}): ${message} - Path: ${req.originalUrl}`)
	}

	// 4. Manejo de errores críticos en Producción
	if (status === 500) {
		logger.err.error(`Stack Trace: ${err.stack}`)
		if (process.env.NODE_ENV === 'production') {
			message = 'Internal Servitor Error'
			errors = []
		}
	}

	return apiResponse.error(res, message, status, errors.length > 0 ? errors : null)
}