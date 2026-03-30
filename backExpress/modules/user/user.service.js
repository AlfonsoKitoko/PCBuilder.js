import User from '../../models/user.model.js'

// C - Crear user
export const createUser = async (userData) => {
	const newUser = new User(userData)
	return await newUser.save()
}

// R - Listar todas las users
export const getAllUsers = async () => {
	return await User.find().lean()
}

// R - Listar user por id
export const getUserById = async (id) => {
	return await User.findById(id).lean()
}

// U - Actualizar user por id
export const updateUser = async (id, userData) => {
	return await User.findByIdAndUpdate(id, userData, {
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar user por id
export const deleteUser = async (id) => {
	return await User.findByIdAndDelete(id)
}