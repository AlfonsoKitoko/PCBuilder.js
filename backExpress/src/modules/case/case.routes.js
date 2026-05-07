import { Router } from 'express'
import * as caseController from './case.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', caseController.findAllCases)
// Sólo ADMIN
router.post('/', protect, restrictTo('ADMIN'), caseController.createCase)

router.get('/:id', caseController.findCaseById)

// Sólo ADMIN
router.patch('/:id', protect, restrictTo('ADMIN'), caseController.updateCaseById)
router.delete('/:id', protect, restrictTo('ADMIN'), caseController.deleteCaseById)

export default router