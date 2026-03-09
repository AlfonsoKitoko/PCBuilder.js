const mongoose = require("mongoose")
const { RAM_TYPE, WIFI_STANDARD } = require("../constants/index.constant")
const { positiveIntegerValidator } = require("../validators/integer.validator")

const moboSchema = new mongoose.Schema(
	{
		// _id autogenerado
		manufacturer: { type: String, required: true },
		model: { type: String, required: true },
		socket: { type: String, required: true },
		form_factor: { type: String, enum: FORM_FACTOR, required: true },
		chipset: { type: String, required: true },
		ram_type: { type: String, enum: RAM_TYPE, required: true },
		ram_slots: { type: Number, required: true, min: 2, validate: positiveIntegerValidator },
		internal_connectors: {
			sata_6gb: { type: Number, min: 0, required: true, validate: positiveIntegerValidator },
			m2_nvme: { type: Number, min: 0, required: true, validate: positiveIntegerValidator },
			pcie: {
				x16: { type: Number, min: 0, required: true, validate: positiveIntegerValidator },
				x4: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				x1: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator }
			},
			usb_headers: {
				usb2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				usb3_gen1: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				usb3_gen2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				usb3_gen2x2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator }
			}
		},
		rear_io: {
			usb: {
				usb2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				usb3_gen1: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				usb3_gen2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				usb3_gen2x2: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator }
			},
			ethernet: [
				{
					speed: { type: Number, required: true, validate: positiveIntegerValidator },
					quantity: { type: Number, min: 1, required: true, validate: positiveIntegerValidator }
				}
			],
			video: {
				vga: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				dvi: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				hdmi: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator },
				displayport: { type: Number, min: 0, default: 0, validate: positiveIntegerValidator }
			},
			audio_jacks: { type: Number, min: 0, default: 3, validate: positiveIntegerValidator }
		},
		wireless: {
			wifi: { type: String, required: true, enum: WIFI_STANDARD, default: "None" },
			bluetooth: { type: Boolean, required: true, default: false }
		},
		// Price en céntimos
		price: { type: Number, required: true, min: 0, validate: positiveIntegerValidator },
		partType: { type: mongoose.Schema.Types.ObjectId, ref: "Part", required: true }
	},
	{ timestamps: true }
)
/* Ejemplo MOBO:
	- manufacturer: MSI
	- model: MAG B550 Tomahawk
	- socket: AM4
	- form_factor: ATX
	- chipset: B550
	- ram_type: DDR4
	- ram_slots: 4
	-internal_connectors:
		- sata_6gb: 6,
		- m2_nvme: 2,
		- pcie:
			- x16: 1,
			- x4: 1,
			- x1: 2
		- usb_headers:
			- usb2: 2,
			- usb3_gen1: 1,
			- usb3_gen2: 0,
			- usb3_gen2x2: 0
	- rear_io:
		- usb:
			- usb2: 2,
			- usb3_gen1: 4,
			- usb3_gen2: 2,
			- usb3_gen2x2: 0
		- ethernet:
				- speed: 2500,   // 2.5 GbE
				- quantity: 1
		- video:
			- vga: 0,
			- dvi: 0,
			- hdmi: 1,
			- displayport: 1
		- audio_jacks: 5
		- wireless:
			- wifi:  Wi-Fi 6E
			- bluetooth: No
	- price: 17999, // 179.99 €
	- partType: Mobo
*/

export const Mobo = mongoose.model("Mobo", moboSchema)