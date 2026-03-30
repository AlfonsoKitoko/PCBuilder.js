import { Router } from 'express'
import * as ramController from './ram.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', ramController.findAllRams)
router.get('/:id', ramController.findRamById)

// router.post('/', protect, ramController.createRam)
// router.patch('/:id', protect, ramController.updateRamById)
// router.delete('/:id', protect, ramController.deleteRamById)

router.post('/', ramController.createRam)
router.patch('/:id', ramController.updateRamById)
router.delete('/:id', ramController.deleteRamById)

export default router