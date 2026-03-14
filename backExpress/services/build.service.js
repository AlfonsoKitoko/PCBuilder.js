const buildModel = require("../models/build.model")
const userModel = require("../models/user.model")
// const partModel = require("../models/part.model")
// TODO: BUILD.SERVICE
// R - Lista todas las builds
exports.getAll = async () => {
	return await buildModel.find()
		.populate("Mobo", "-__v")
		.populate("CPU", "-__v")
		.populate("RAM", "-__v")
		.populate("PSU", "-__v")
		.populate("Storage", "-__v")
		.populate("Case", "-__v")
		.populate("GPU", "-__v")
		.populate("OS", "-__v")
		.populate("User", "-__v")
}

// R - Lista todas las builds de UN usuario
exports.getAllByUser = async (userId) => await buildModel.find({ owner: userId })

// C - Crea una nueva build
exports.create = async (data) => {
	const newBuild = new buildModel(datos)
	return await newBuild.save()
}

// U - Actualiza la build
exports.update = async (id, data) => buildModel.findByIdAndUpdate(id, data)

// D- Elimina la build
exports.delete = async () => {
	try {

	} catch (error) {
		return res.status()
	}
}
