import { Router } from 'express'
import * as moboController from './mobo.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', moboController.findAllMobos)
router.get('/:id', moboController.findMoboById)

// router.post('/', protect, moboController.createMobo)
// router.patch('/:id', protect, moboController.updateMoboById)
// router.delete('/:id', protect, moboController.deleteMoboById)

router.post('/', moboController.createMobo)
router.patch('/:id', moboController.updateMoboById)
router.delete('/:id', moboController.deleteMoboById)

export default router