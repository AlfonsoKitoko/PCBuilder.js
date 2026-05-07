import * as authService from './auth.service.js'
import { wrapAsync } from '../../utils/asyncHandler.js'
import * as apiResponse from '../../utils/apiResponse.js'
import User from '../../models/user.model.js'
import AppError from '../../utils/AppError.js'

export const login = wrapAsync(async (req, res) => {
	const { email, password } = req.body
	const { user, token } = await authService.login(email, password)
	res.cookie('token', token, {
		httpOnly: true,
		secure: false,
		sameSite: 'lax'
	})

	return apiResponse.success(res, 'Login successful', { user, token })
})

export const register = wrapAsync(async (req, res) => {
	const { user, token } = await authService.register(req.body)
	return apiResponse.success(res, 'Registration successful', { user, token })
})

export const logout = (req, res) => {
	res.cookie('token', 'logout', {
		expires: new Date(Date.now() + 1000),
		httpOnly: true
	})
	return apiResponse.success(res, 'Logout successful', null)
}

export const forgotPassword = wrapAsync(async (req, res) => {
	const { email } = req.body
	const result = await authService.requestPasswordReset(email)

	return apiResponse.success(res, 'Reset email sent successfully', result)
})

export const verifyResetToken = wrapAsync(async (req, res) => {
	const { token } = req.params

	const user = await User.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() }
	})

	if (!user) throw new AppError('Token is invalid or has expired')

	return apiResponse.success(res, 'Valid token', { valid: true })
})

export const resetPassword = wrapAsync(async (req, res) => {
	const { token } = req.params
	const { password } = req.body
	const result = await authService.resetUserPassword(token, password)

	return apiResponse.success(res, 'Password has been reset successfully', result)
})

export const getMe = wrapAsync(async (req, res) => {
	return apiResponse.success(res, 'User data retrieved', req.user)
})