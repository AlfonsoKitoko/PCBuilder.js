import { Router } from 'express'
import * as osController from './os.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', osController.findAllOss)
router.get('/:id', osController.findOsById)
// Sólo el ADMIN puede crear, modificar o eliminar OS
router.post('/', protect, restrictTo('ADMIN'), osController.createOs)
router.patch('/:id', protect, restrictTo('ADMIN'), osController.updateOsById)
router.delete('/:id', protect, restrictTo('ADMIN'), osController.deleteOsById)

export default router