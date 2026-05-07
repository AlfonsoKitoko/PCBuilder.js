import { Router } from 'express'
import * as moboController from './mobo.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', moboController.findAllMobos)
// Sólo ADMIN
router.post('/', protect, restrictTo('ADMIN'), moboController.createMobo)

router.get('/:id', moboController.findMoboById)

// Sólo ADMIN
router.patch('/:id', protect, restrictTo('ADMIN'), moboController.updateMoboById)
router.delete('/:id', protect, restrictTo('ADMIN'), moboController.deleteMoboById)

export default router