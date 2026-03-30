import { Router } from 'express'
import * as buildController from './build.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.use(protect)

router.route('/')
	.get(buildController.getMyBuilds)
	.post(buildController.createBuild)

router.route('/:id')
	.put(buildController.updateBuild)
	.delete(buildController.deleteBuild)

export default router