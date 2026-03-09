const mongodbConfig = require("../utils/mongodb.config")

const partModel = require("../models/part.model")

const caseModel = require("../case.model")
const cpuModel = require("../cpu.model")
const moboModel = require("../mobo.model")
const gpuModel = require("../gpu.model")
const psuModel = require("../psu.model")
const ramModel = require("../ram.model")
const soModel = require("../so.model")
const storageModel = require("../storage.model")

const exec = async () => {
	try {
		await mongodbConfig.conexMongoDB()
			.then(() => {
				console.log("Conexión establecida con MongoDB")
			})
			.catch((err) => {
				console.log(`Error de conexión con MongoDB: ${err}`)
				process.exit(0)
			})
	} catch (error) {
		console.log(`Error de conexión con MongoDB: ${error}`)
		process.exit(0)
	}
}
/* plantilla para cpu:
{
	manufacturer:"",
	series:"",
	model:"",
	base_freq:"",
	boost_freq:"",
	tdp:"",
	core_count:"",
	socket:"",
	hasIntegrated:"",
	integrated_graphics:"",
	price:"",
	partType:""
} */
const procesadores = [
	{
		manufacturer: "",
		series: "",
		model: "",
		base_freq: "",
		boost_freq: "",
		tdp: "",
		core_count: "",
		socket: "",
		hasIntegrated: "",
		integrated_graphics: "",
		price: "",
		partType: ""
	},
]
/* plantilla para case:
{
	name:"",
	volume:"",
	form_factor:"",
	price:"",
	partType:""
} */
const cajas = [
	{
		name: "",
		volume: "",
		form_factor: "",
		price: "",
		partType: ""
	},
]
const graficas = []
const fuentes = []
const rams = []
const discos = []
const sos = []