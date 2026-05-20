import morgan from 'morgan'
import logger from '../config/logger.config.js'

export const usingMorgan = () => {
	const stream = {
		write: (message) => logger.access.info(message.trim())
	}

	const skipImages = (req, res) => {
		const path = req.originalUrl || ''
		return path.startsWith('/img/') || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(path)
	}
	const customFormat = ':method :url :status :response-time ms :res[content-length] bytes'

	return morgan(customFormat, { stream, skip: skipImages })
}