import * as authService from './auth.service.js'
import { wrapAsync } from '../../utils/asyncHandler.js'
import * as apiResponse from '../../utils/apiResponse.js'

export const login = wrapAsync(async (req, res) => {
	const { email, password } = req.body
	const { user, token } = await authService.login(email, password)
	return apiResponse.success(res, 'Login successful', { user, token })
})

export const register = wrapAsync(async (req, res) => {
	const user = await authService.register(req.body)
	return apiResponse.success(res, 'Registration successful', user)
})