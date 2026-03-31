import { Router } from 'express'
import * as partController from './part.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', partController.findAllParts)
router.get('/:id', partController.findPartById)
// Sólo el ADMIN puede crear, modificar o eliminar PARTs
router.post('/', protect, restrictTo('ADMIN'), partController.createPart)
router.patch('/:id', protect, restrictTo('ADMIN'), partController.updatePartById)
router.delete('/:id', protect, restrictTo('ADMIN'), partController.deletePartById)

export default router