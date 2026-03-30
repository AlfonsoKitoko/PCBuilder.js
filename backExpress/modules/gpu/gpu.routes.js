import { Router } from 'express'
import * as gpuController from './gpu.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', gpuController.findAllGpus)
router.get('/:id', gpuController.findGpuById)

// router.post('/', protect, gpuController.createGpu)
// router.patch('/:id', protect, gpuController.updateGpuById)
// router.delete('/:id', protect, gpuController.deleteGpuById)

router.post('/', gpuController.createGpu)
router.patch('/:id', gpuController.updateGpuById)
router.delete('/:id', gpuController.deleteGpuById)

export default router