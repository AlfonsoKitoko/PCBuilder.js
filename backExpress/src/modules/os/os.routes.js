import { Router } from 'express'
import * as osController from './os.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', osController.findAllOss)
// Sólo ADMIN
router.post('/', protect, restrictTo('ADMIN'), osController.createOs)

router.get('/:id', osController.findOsById)

// Sólo ADMIN
router.patch('/:id', protect, restrictTo('ADMIN'), osController.updateOsById)
router.delete('/:id', protect, restrictTo('ADMIN'), osController.deleteOsById)

export default router