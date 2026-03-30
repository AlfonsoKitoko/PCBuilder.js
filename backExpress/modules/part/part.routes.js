import { Router } from 'express'
import * as partController from './part.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', partController.findAllParts)
router.get('/:id', partController.findPartById)

// router.post('/', protect, partController.createPart)
// router.patch('/:id', protect, partController.updatePartById)
// router.delete('/:id', protect, partController.deletePartById)

router.post('/', partController.createPart)
router.patch('/:id', partController.updatePartById)
router.delete('/:id', partController.deletePartById)

export default router