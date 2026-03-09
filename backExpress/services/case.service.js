const caseModel = require("../models/case.model")

// R - Devuelve todas las cases
exports.getAll = async () => await caseModel.find()

// R - Devuelve todas las cases con el manufacturer indicado
exports.getByManufacturer = async (manufacturer) => await caseModel.find({ manufacturer: manufacturer.ToUpperCase() })

// C - Crea nueva case
exports.create = async (data) => {
	const newCase = new caseModel(data)
	return await newCase.save()
}

// U - Actualiza datos de case mediante su id
exports.update = async (id, data) => await caseModel.findByIdAndUpdate(id, data, { new: true })

// U - Elimina case mediante su id
exports.delete = async (id) => await caseModel.findByIdAndDelete(id)