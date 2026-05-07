import { Router } from 'express'
import * as buildController from './build.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

// R - Listar todas las builds (público)
router.get('/', buildController.getAllBuilds)

// R - Listar propias usuario (requiere login)
router.get('/mine', protect, buildController.getMyBuilds)

router.post('/validate', protect, buildController.validateBuild)

// R - Detalle build por id
router.get('/:id', buildController.getBuildById)

// C - Crear build (requiere login)
router.post('/', protect, buildController.createBuild)

// R - Listar builds de un usuario específico (requiere login, pero se pueden ver ajenas)
router.get('/user/:userId', protect, buildController.getBuildsByOneUser)

// U - Actualizar build por id (sólo dueño o admin)
router.patch('/:id', protect, buildController.updateBuild)

// D - Eliminar build por id (sólo dueño o admin)
router.delete('/:id', protect, buildController.deleteBuild)

export default router