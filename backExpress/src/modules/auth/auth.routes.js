import { Router } from 'express'
import * as authController from './auth.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

// Crear cuenta
router.post('/register', authController.register)

// Inicio de sesión
router.post('/login', authController.login)

// Cerrar sesión
router.post('/logout', authController.logout)

// Olvidó contraseña
router.post('/forgot-password', authController.forgotPassword)

// Reiniciar contraseña
router.get('/reset-password/:token', authController.verifyResetToken)
router.post('/reset-password/:token', authController.resetPassword)

// Obtiene los datos del usuario
router.get('/me', protect, authController.getMe)

export default router