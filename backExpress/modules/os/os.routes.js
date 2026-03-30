import { Router } from 'express'
import * as osController from './os.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', osController.findAllOss)
router.get('/:id', osController.findOsById)

// router.post('/', protect, osController.createOs)
// router.patch('/:id', protect, osController.updateOsById)
// router.delete('/:id', protect, osController.deleteOsById)

router.post('/', osController.createOs)
router.patch('/:id', osController.updateOsById)
router.delete('/:id', osController.deleteOsById)

export default router