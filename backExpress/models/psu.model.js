import mongoose from 'mongoose'
import { PSU_TYPE, EFF_RATING, MODULAR, CONNECTORS } from '../constants/index.constant.js'
import { positiveIntegerValidator } from '../validators/integer.validator.js'

const psuSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, required: true },
		model: { type: String, required: true },
		psu_type: { type: String, required: true, enum: PSU_TYPE },
		wattage: { type: Number, required: true, min: 1, validate: positiveIntegerValidator },
		eff_rating: { type: String, required: true, enum: EFF_RATING },
		modular: { type: String, required: true, enum: MODULAR },
		eps_atx_connectors: { type: String, required: true, enum: CONNECTORS },
		connectors: {
			atx_4pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
			eps_8pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
			pcie_16pin_12vhpwr: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
			pcie_12pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
			pcie_8pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
			pcie_6plus2pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
			pcie_6pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
			sata: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
			amp_molex_4pin: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		},
		// Céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true }
	},
	{ timestamps: true }
)

const Psu = mongoose.model('PSU', psuSchema)

export default Psu

/* Ejemplo psu:
- manufacturer: Corsair
- model: CX750M (2021)
- psu_type: ATX
- wattage: 750
- eff_rating: 80+ Bronze
- modular: Semi
- pcie_connectors:
	- atx_4pin: 0
	- eps_8pin: 2
	- pcie_16pin_12vhpwr: 0
	- pcie_12pin: 0
	- pcie_8pin: 0
	- pcie_6plus2pin: 4
	- pcie_6pin: 0
	- sata: 8
	- amp_molex_4pin: 4
- price: 59,99 €
- partType: psu
*/
