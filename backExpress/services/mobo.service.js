const moboModel = require("../models/mobo.model")
// TODO: MOBO.SERVICE

// R - Devuelve todas las motherboards
exports.getAll = async () => await moboModel.find()

// R - Devuelve todas las motherboards con el manufacturer indicado
exports.getByManufacturer = async (manufacturer) => await moboModel.find({ manufacturer: manufacturer.ToUpperCase() })

// R - Devuelve todas las motherboards con el form_factor indicado
exports.getByFormFactor = async (form_factor) => await moboModel.find({ form_factor: form_factor.ToUpperCase() })

// R - Devuelve todas las motherboards con el socket indicado
exports.getBySocket = async (socket) => await moboModel.find({ socket: socket.ToUpperCase() })

// R - Devuelve todas las motherboards con el chipset indicado
exports.getByChipset = async (chipset) => await moboModel.find({ chipset: chipset.ToUpperCase() })

// C - Crea nueva motherboard
exports.create = async (data) => {
	const newMobo = new moboModel(data)
	return await newMobo.save()
}

// U - Actualiza datos de motherboard mediante su id
exports.update = async (id, data) => await moboModel.findByIdAndUpdate(id, data, { new: true })

// D - Elimina motherboard mediante su id
exports.delete = async (id) => await moboModel.findByIdAndDelete(id)
