import 'dotenv/config'
import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError.js'
import User from '../models/user.model.js'

export const protect = async (req, res, next) => {
	let token = null

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
		token = req.headers.authorization.split(' ')[1]

	if (!token && req.cookies?.token) token = req.cookies.token

	if (!token) return next(new AppError('Not authenticated', 401))

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const currentUser = await User.findById(decoded.id)

		if (!currentUser) return next(new AppError('The user belonging to this token no longer exists', 401))

		req.user = currentUser
		next()
	} catch (error) {
		next(new AppError(`Token invalid or expired. Desc: ${error}`, 401))
	}
}