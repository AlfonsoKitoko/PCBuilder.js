import morgan from 'morgan'
import logger from '../config/logger.config.js'

export const usingMorgan = () => {
	const stream = {
		write: (message) => logger.access.info(message.trim())
	}
	const customFormat = '- :method :url :status :response-time ms :res[content-length] bytes'

	return morgan(customFormat, { stream })
}