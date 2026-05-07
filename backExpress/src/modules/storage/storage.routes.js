import { Router } from 'express'
import * as storageController from './storage.controller.js'
import { protect } from '../../middlewares/jwt.mw.js'
import { restrictTo } from '../../middlewares/profile.mw.js'

const router = Router()

router.get('/', storageController.findAllStorages)
// Sólo ADMIN
router.post('/', protect, restrictTo('ADMIN'), storageController.createStorage)

router.get('/:id', storageController.findStorageById)

// Sólo ADMIN
router.patch('/:id', protect, restrictTo('ADMIN'), storageController.updateStorageById)
router.delete('/:id', protect, restrictTo('ADMIN'), storageController.deleteStorageById)

export default router