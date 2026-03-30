import { Router } from 'express'
import * as userController from './user.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', userController.findAllUsers)
router.get('/:id', userController.findUserById)

// router.post('/', protect, userController.createUser)
// router.patch('/:id', protect, userController.updateUserById)
// router.delete('/:id', protect, userController.deleteUserById)

router.post('/', userController.createUser)
router.patch('/:id', userController.updateUserById)
router.delete('/:id', userController.deleteUserById)

export default router