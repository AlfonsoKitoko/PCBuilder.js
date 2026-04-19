import 'dotenv/config'

import crypto from 'crypto'
import User from '../../models/user.model.js'
import AppError from '../../utils/AppError.js'
import { hashPassword, comparePassword } from '../../utils/bcrypt.js'
import { sendEmail } from '../../utils/mailer.js'
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

// RECUPERAR CONTRASEÑA
export const requestPasswordReset = async (email) => {
	const user = await User.findOne({ email })

	// Comentar una vez nos aseguremos que funcione, el usuario NO debería saber si el correo existe o no
	if (!user) throw new AppError('User not found with that email')

	// Genera token de reset
	const resetToken = crypto.randomBytes(20).toString('hex')

	user.resetPasswordToken = resetToken
	user.resetPasswordExpires = Date.now() + 600000	// 10 minutos

	await user.save()

	const resetUrl = `${process.env.FRONT_PORT || 'http://localhost:4201'}/reset-password/${resetToken}`

	await sendEmail(
		user.email,
		'Password Reset Request - PBUILDER',
		`
			<div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2>Has solicitado restablecer tu contraseña</h2>
        <p>Haz clic en el botón de abajo para elegir una nueva contraseña. Este enlace expira en 1 hora.</p>
        <a href="${resetUrl}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Restablecer Contraseña
        </a>
        <p>Si no solicitaste esto, ignora este correo.</p>
      </div>
		`
	)

	return { message: 'Reset email sent' }
}

export const resetUserPassword = async (token, newPassword) => {
	const user = await User.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() }
	}).select('+password')

	if (!user) throw new AppError('Token is invalid or has expired', 400)

	if (!newPassword || !PASS_REGEX.test(newPassword)) throw new AppError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character')

	user.password = await hashPassword(newPassword)

	user.resetPasswordToken = undefined
	user.resetPasswordExpires = undefined

	await user.save()

	return { message: 'Password updated successfully' }
}