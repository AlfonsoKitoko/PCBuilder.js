const cpuModel = require("../models/cpu.model")
// TODO: CASE.SERVICE
// R - Devuelve todas las cpus
exports.getAll = async () => await cpuModel.find()

// R - Devuelve todas las cpus con el manufacturer indicado
exports.getByManufacturer = async (manufacturer) => await cpuModel.find({ manufacturer: manufacturer.ToUpperCase() })

// R - Devuelve todas las cpus con el form_factor indicado
exports.getBySeries = async (form_factor) => await cpuModel.find({ form_factor: form_factor.ToUpperCase() })

// R - Devuelve todas las cpus con el socket indicado
exports.getBySocket = async (socket) => await cpuModel.find({ socket: socket.ToUpperCase() })

// R - Devuelve todas las cpus con el chipset indicado
exports.getByChipset = async (chipset) => await cpuModel.find({ chipset: chipset.ToUpperCase() })

// C - Crea nueva cpu
exports.create = async (data) => {
	const newMobo = new cpuModel(data)
	return await newMobo.save()
}

// U - Actualiza datos de cpu mediante su id
exports.update = async (id, data) => await cpuModel.findByIdAndUpdate(id, data, { new: true })

// D - Elimina cpu mediante su id
exports.delete = async (id) => await cpuModel.findByIdAndDelete(id)
