import { Router } from 'express'
import * as caseController from './case.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', caseController.findAllCases)
router.get('/:id', caseController.findCaseById)
// Sólo el ADMIN puede crear, modificar o eliminar CASEs
router.post('/', protect, restrictTo('ADMIN'), caseController.createCase)
router.patch('/:id', protect, restrictTo('ADMIN'), caseController.updateCaseById)
router.delete('/:id', protect, restrictTo('ADMIN'), caseController.deleteCaseById)

export default router