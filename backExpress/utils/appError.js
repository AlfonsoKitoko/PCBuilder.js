class AppError extends Error {
	constructor(message, status, errors = []) {
		super(message)
		this.status = status
		this.errors = errors
		this.isOperational = true

		Error.captureStackTrace(this, this.constructor)
	}
}

export default AppError