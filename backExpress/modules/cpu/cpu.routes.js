import { Router } from 'express'
import * as cpuController from './cpu.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', cpuController.findAllCpus)
router.get('/:id', cpuController.findCpuById)
// Sólo el ADMIN puede crear, modificar o eliminar CPUs
router.post('/', protect, restrictTo('ADMIN'), cpuController.createCpu)
router.patch('/:id', protect, restrictTo('ADMIN'), cpuController.updateCpuById)
router.delete('/:id', protect, restrictTo('ADMIN'), cpuController.deleteCpuById)

export default router