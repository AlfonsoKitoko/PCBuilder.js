import { Router } from 'express'
import * as authController from './auth.controller.js'

const router = Router()

// Crear cuenta
router.post('/register', authController.register)

// Inicio de sesión
router.post('/login', authController.login)

// Cerrar sesión
router.get('/logout', authController.logout)

// Olvidó contraseña
router.post('/forgot-password', authController.forgotPassword)

// Reiniciar contraseña
router.post('/reset-password/:token', authController.resetPassword)

export default router