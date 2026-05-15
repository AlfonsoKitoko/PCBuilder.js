import { Router } from 'express'
import * as userController from './user.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

// R - Listar todas las Users
router.get('/', protect, userController.findAllUsers)

// U - Modificar mismo User
router.patch('/me', protect, userController.updateMe)

// R - Buscar por ID
router.get('/:id', protect, userController.findUserById)

// Sólo el ADMIN puede crear, modificar o eliminar USERs

// C - Crear User
router.post('/', protect, restrictTo('ADMIN'), userController.createUser)

// U - Modificar User
router.patch('/:id', protect, userController.updateUserById)

// D - Eliminar User
router.delete('/:id', protect, userController.deleteUserById)

export default router