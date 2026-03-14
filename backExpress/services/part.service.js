const partModel = require("../models/part.model")
// TODO: PART.SERVICE

exports.getAll = async () => await partModel.find()

exports.getByName = async (name) => await partModel.findOne({ name: name.toTupperCase() })
