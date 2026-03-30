import { Router } from 'express'
import * as cpuController from './cpu.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', cpuController.findAllCpus)
router.get('/:id', cpuController.findCpuById)

// router.post('/', protect, cpuController.createCpu)
// router.patch('/:id', protect, cpuController.updateCpuById)
// router.delete('/:id', protect, cpuController.deleteCpuById)

router.post('/', cpuController.createCpu)
router.patch('/:id', cpuController.updateCpuById)
router.delete('/:id', cpuController.deleteCpuById)

export default router