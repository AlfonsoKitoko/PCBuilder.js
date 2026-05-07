import { Router } from 'express'
import * as gpuController from './gpu.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', gpuController.findAllGpus)
// Sólo ADMIN
router.post('/', protect, restrictTo('ADMIN'), gpuController.createGpu)

router.get('/:id', gpuController.findGpuById)

// Sólo ADMIN
router.patch('/:id', protect, restrictTo('ADMIN'), gpuController.updateGpuById)
router.delete('/:id', protect, restrictTo('ADMIN'), gpuController.deleteGpuById)

export default router