import * as authService from './auth.service.js'
import { wrapAsync } from '../../utils/asyncHandler.js'
import * as apiResponse from '../../utils/apiResponse.js'

export const login = wrapAsync(async (req, res) => {
	const { email, password } = req.body
	const { user, token } = await authService.login(email, password)
	return apiResponse.success(res, 'Login successful', { user, token })
})

export const register = wrapAsync(async (req, res) => {
	const { user, token } = await authService.register(req.body)
	return apiResponse.success(res, 'Registration successful', { user, token })
})

export const logout = (req, res) => {
	res.cookie('jwt', 'logout', {
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

export const resetPassword = wrapAsync(async (req, res) => {
	const { token } = req.params
	const { password } = req.body
	const result = await authService.resetUserPassword(token, password)

	return apiResponse.success(res, 'Pasword has been reset successfully', result)
})

export const getMe = wrapAsync(async (req, res) => {
	return apiResponse.success(res, 'User data retrieved', req.user)
})