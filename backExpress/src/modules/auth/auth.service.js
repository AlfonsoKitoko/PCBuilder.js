import 'dotenv/config'

import crypto from 'crypto'
import User from '../../models/user.model.js'
import AppError from '../../utils/AppError.js'
import { hashPassword, comparePassword } from '../../utils/bcrypt.js'
import { sendEmail } from '../../utils/mailer.js'
import jwt from 'jsonwebtoken'


import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logoPath = path.join(__dirname, '../../../public/pcbuilder_logo.png')

const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

export const login = async (email, password) => {
	const userFound = await User.findOne({ email }).select('+password')
	if (!userFound) throw new AppError('User not found', 401)

	const validPassword = await comparePassword(password, userFound.password)
	if (!validPassword) throw new AppError('Invalid credentials', 401)

	// Expiración especial para admin
	const expiresIn = (userFound.email === process.env.ADMIN_EMAIL) ? '3650d' : '1h'

	const token = jwt.sign(
		{
			id: userFound._id,
			email: userFound.email,
			profile: userFound.profile
		},
		process.env.JWT_SECRET,
		{ expiresIn }
	)

	const user = userFound.toObject()
	delete user.password

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

	const resetUrl = `http://localhost:${process.env.FRONT_PORT || '4201'}/auth/reset-password/${resetToken}`

	await sendEmail(
		user.email,
		'Restablecer Contraseña - PCBuilder',
		`
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700;900&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f9f9ff;">
    <div style="font-family: 'Rubik', sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e8e4ff; border-radius: 16px; padding: 40px; color: #1e293b; box-shadow: 0 4px 12px rgba(79, 16, 242, 0.05);">
      
      <div style="text-align: start; margin-bottom: 30px;">
        <img src="cid:logo_pcbuilder" alt="PCBuilder Logo" style="width: 220px; height: auto;">
      </div>

      <h2 style="color: #4f10f2; margin-top: 0; font-weight: 700; font-size: 24px;">Hola, ${user.firstName || 'usuario'}</h2>
      
      <p style="font-size: 16px; line-height: 1.6; color: #475569;">
        Has solicitado restablecer tu contraseña. No te preocupes, nos pasa a los mejores. Haz clic en el botón de abajo para elegir una nueva:
      </p>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="${resetUrl}" style="background: #4f10f2; background: linear-gradient(to right, #4f10f2, #ec4899); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: 700; display: inline-block; font-size: 16px; box-shadow: 0 4px 12px rgba(79, 16, 242, 0.3);">
          Restablecer Contraseña
        </a>
      </div>
      
      <div style="background-color: #f1f5f9; border-radius: 8px; padding: 15px; margin-bottom: 30px;">
        <p style="font-size: 13px; color: #64748b; margin: 0; text-align: center;">
          <strong>Nota:</strong> Por seguridad, este enlace expirará en <span style="color: #ec4899; font-weight: bold;">10 minutos</span>.
        </p>
      </div>
      
      <p style="font-size: 14px; color: #94a3b8; line-height: 1.5;">
        Si no has solicitado este cambio, simplemente ignora este mensaje. Tu cuenta sigue estando segura y no se han realizado cambios.
      </p>
      
      <hr style="border: none; border-top: 1px solid #e8e4ff; margin: 30px 0;">
      
      <p style="font-size: 12px; color: #b4befe; text-align: center; font-weight: 400;">
        © 2026 PCBuilder - El hardware es nuestra pasión.
      </p>
    </div>
  </body>
  </html>
  `,
		[
			{
				filename: 'pcbuilder_logo.png',
				path: logoPath,
				cid: 'logo_pcbuilder'
			}
		]
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

export const getUserById = async (id) => {
	const user = await User.findById(id).select('-password')
	if (!user) throw new AppError('User no longer exists', 404)

	return user
}