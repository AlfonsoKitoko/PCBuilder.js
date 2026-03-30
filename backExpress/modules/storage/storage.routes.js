import { Router } from 'express'
import * as storageController from './storage.controller.js'
// import { protect } from '../../middlewares/jwt.mw.js'

const router = Router()

router.get('/', storageController.findAllStorages)
router.get('/:id', storageController.findStorageById)

// router.post('/', protect, storageController.createStorage)
// router.patch('/:id', protect, storageController.updateStorageById)
// router.delete('/:id', protect, storageController.deleteStorageById)

router.post('/', storageController.createStorage)
router.patch('/:id', storageController.updateStorageById)
router.delete('/:id', storageController.deleteStorageById)

export default router