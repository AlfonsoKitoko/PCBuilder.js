import User from '../../models/user.model.js'
import AppError from '../../utils/AppError.js'
import { hashPassword, comparePassword } from '../../utils/bcrypt.js'
import jwt from 'jsonwebtoken'

export const login = async (email, password) => {
	const user = await User.findOne({ email }).select('+password')
	if (!user) throw new AppError('Invalid credentials', 401)

	const isMatch = await comparePassword(password, user.password)
	if (!isMatch) throw new AppError('Invalid credentials', 401)

	const token = jwt.sign(
		{ id: user._id },
		process.env.JWT_SECRET,
		{ expiresIn: '1h' }
	)

	user.password = undefined
	return { user, token }
}

export const register = async (name, email, password) => {
	const existingUser = await User.findOne({ email })
	if (existingUser) throw new AppError('Email already in use', 400)

	const hashedPassword = await hashPassword(password)
	const user = await User.create({
		...userData,
		password: hashedPassword
	})
	use.password = undefined

	return user
}