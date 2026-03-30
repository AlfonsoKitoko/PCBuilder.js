import logger from '../config/logger.config.js'
import * as apiResponse from '../utils/apiResponse.js'

export const errorHandler = (err, req, res, next) => {
	let status = err.status || 500
	let message = err.message || 'Internal Servitor Error'
	let errors = null

	if (err.name == 'ValidationError') {
		status = 400
		errors = err.errors
		message = `Validation Error: ${Object.values(err.errors).map(e => `${e.path}:${e.message}`).join(', ')}`
	}

	if (err.name == 'MongoServitorError') {
		status = 400
		// Error de clave duplicada
		if (err.code == 11000) {
			status = 409
			message = `Duplicate key error: ${JSON.stringify(err.keyValue)}`
		}
	}

	logger.err.error(`Error Handler(${status}): ${message} - Path: ${req.originalUrl}`)

	if (status === 500) {
		logger.err.error(`Stack Trace: ${err.stack}`)
		if (process.env.NODE_ENV === 'production') message = 'Internal Servitor Error'
	}

	return apiResponse.error(res, message, status, errors)
}