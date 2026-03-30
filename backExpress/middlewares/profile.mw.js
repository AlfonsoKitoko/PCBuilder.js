import { AppError } from '../utils/AppError.js'

export const restrictTo = (...profiles) => {
	return (req, res, next) => {
		if (!profiles.includes(req.user.profile))
			return next(new AppError('Insufficient permissions', 403))
		next()
	}
}