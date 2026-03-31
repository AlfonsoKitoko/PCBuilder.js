import { Router } from 'express'
import * as psuController from './psu.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', psuController.findAllPsus)
router.get('/:id', psuController.findPsuById)
// Sólo el ADMIN puede crear, modificar o eliminar PSUs
router.post('/', protect, restrictTo('ADMIN'), psuController.createPsu)
router.patch('/:id', protect, restrictTo('ADMIN'), psuController.updatePsuById)
router.delete('/:id', protect, restrictTo('ADMIN'), psuController.deletePsuById)

export default router