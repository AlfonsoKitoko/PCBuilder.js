import { Router } from 'express'
import * as psuController from './psu.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', psuController.findAllPsus)
router.get('/:id', psuController.findPsuById)

// router.post('/', protect, psuController.createPsu)
// router.patch('/:id', protect, psuController.updatePsuById)
// router.delete('/:id', protect, psuController.deletePsuById)

router.post('/', psuController.createPsu)
router.patch('/:id', psuController.updatePsuById)
router.delete('/:id', psuController.deletePsuById)

export default router