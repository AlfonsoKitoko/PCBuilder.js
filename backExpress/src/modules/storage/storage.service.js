import Storage from '../../models/storage.model.js'

// C - Crear storage
export const createStorage = async (storageData) => {
	const newStorage = new Storage(storageData)
	return await newStorage.save()
}

// R - Listar todas las storages
export const getAllStorages = async () => {
	return await Storage.find().populate('partType', 'name -_id').lean()
}

// R - Listar storage por id
export const getStorageById = async (id) => {
	return await Storage.findById(id).populate('partType', 'name -_id').lean()
}

// U - Actualizar storage por id
export const updateStorage = async (id, storageData) => {
	return await Storage.findByIdAndUpdate(id, storageData, {
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar storage por id
export const deleteStorage = async (id) => {
	return await Storage.findByIdAndUpdate(id, { active: false })
}