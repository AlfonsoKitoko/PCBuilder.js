import { Router } from 'express'
import * as caseController from './case.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', caseController.findAllCases)
router.get('/:id', caseController.findCaseById)

// router.post('/', protect, caseController.createCase)
// router.patch('/:id', protect, caseController.updateCaseById)
// router.delete('/:id', protect, caseController.deleteCaseById)

router.post('/', caseController.createCase)
router.patch('/:id', caseController.updateCaseById)
router.delete('/:id', caseController.deleteCaseById)

export default router