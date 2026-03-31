import { Router } from 'express'

import buildRoutes from '../modules/build/build.routes.js'
import caseRoutes from '../modules/case/case.routes.js'
import cpuRoutes from '../modules/cpu/cpu.routes.js'
import gpuRoutes from '../modules/gpu/gpu.routes.js'
import ramRoutes from '../modules/ram/ram.routes.js'
import moboRoutes from '../modules/mobo/mobo.routes.js'
import osRoutes from '../modules/os/os.routes.js'
import psuRoutes from '../modules/psu/psu.routes.js'
import storageRoutes from '../modules/storage/storage.routes.js'
import partRoutes from '../modules/part/part.routes.js'
import authRoutes from '../modules/auth/auth.routes.js'
import userRoutes from '../modules/user/user.routes.js'

const router = Router()
// ++ HOME ++
router.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'Welcome to PcBuilder API',
		version: '1.0.0'
	})
})

// ++ Autenticación y Usuarios ++
router.use('/auth', authRoutes)
router.use('/users', userRoutes)

// ++ Builds ++
router.use('/builds', buildRoutes)

// ++ Catálogo de Partes (CRUD de piezas) ++
router.use('/cases', caseRoutes)
router.use('/cpus', cpuRoutes)
router.use('/gpus', gpuRoutes)
router.use('/rams', ramRoutes)
router.use('/mobos', moboRoutes)
router.use('/oss', osRoutes)
router.use('/psus', psuRoutes)
router.use('/storage', storageRoutes)

// ++ Categorías Maestras ++
router.use('/parts', partRoutes)

export default router