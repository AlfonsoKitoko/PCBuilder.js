import 'dotenv/config'

import User from '../../models/user.model.js'
import AppError from '../../utils/AppError.js'
import { hashPassword, comparePassword } from '../../utils/bcrypt.js'
import jwt from 'jsonwebtoken'

const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const login = async (email, password) => {
	const user = await User.findOne({ email }).select('+password')
	if (!user) throw new AppError('Invalid credentials', 401)

	const isMatch = await comparePassword(password, user.password)
	if (!isMatch) throw new AppError('Invalid credentials', 401)

	// Expiración especial para admin
	const expiresIn = (user.email === process.env.ADMIN_EMAIL) ? '3650d' : '1h'

	const token = jwt.sign(
		{ id: user._id },
		process.env.JWT_SECRET,
		{ expiresIn }
	)

	user.password = undefined
	return { user, token }
}
// SIEMPRE se crea 'USER'
export const register = async (userData) => {
	const { email, password, profile } = userData

	const existingUser = await User.findOne({ email })
	if (existingUser) throw new AppError('Email already in use', 400)

	if (!password || !PASS_REGEX.test(password)) {
		throw new AppError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character', 400)
	}

	const hashedPassword = await hashPassword(password)

	const user = await User.create({
		...userData,
		profile: 'USER',
		password: hashedPassword
	})

	user.password = undefined

	return user
}