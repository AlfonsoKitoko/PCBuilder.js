import { Router } from 'express'
import * as moboController from './mobo.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', moboController.findAllMobos)
router.get('/:id', moboController.findMoboById)
// Sólo el ADMIN puede crear, modificar o eliminar MOBOs
router.post('/', protect, restrictTo('ADMIN'), moboController.createMobo)
router.patch('/:id', protect, restrictTo('ADMIN'), moboController.updateMoboById)
router.delete('/:id', protect, restrictTo('ADMIN'), moboController.deleteMoboById)

export default router