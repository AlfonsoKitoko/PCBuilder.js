import { Router } from 'express'
import * as ramController from './ram.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', ramController.findAllRams)
// Sólo ADMIN
router.post('/', protect, restrictTo('ADMIN'), ramController.createRam)

router.get('/:id', ramController.findRamById)
// Sólo ADMIN

router.patch('/:id', protect, restrictTo('ADMIN'), ramController.updateRamById)
router.delete('/:id', protect, restrictTo('ADMIN'), ramController.deleteRamById)

export default router