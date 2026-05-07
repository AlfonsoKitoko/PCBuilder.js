import { moboFormFactor, ramType, wifiStandard } from "../constants/index.constant"
import { Part } from "./part.model"

export interface Mobo {
	_id?: string
	manufacturer: string
	model: string
	socket: string
	form_factor: moboFormFactor
	chipset: string
	ram_type: ramType
	ram_slots: number
	internal_connectors: InternalConnectors
	rear_io: RearIO
	wireless: Wireless
	price: number
	partType: Part
	slug: string

	createdAt?: string
	updatedAt?: string
}

export interface Wireless {
	wifi: wifiStandard
	bluetooth: boolean
}

export interface InternalConnectors {
	storage: StorageConnector
	expansion_slots: ExpansionSlot
	usb_headers: UsbHeader
}

export interface RearIO {
	usb_ports: RearPorts
	ethernet: Ethernet
	video: Video
	audio_jacks: number
}

export interface Ethernet {
	speed: number
	quantity: number
}

export interface RearPorts {
	ps2: number
	serial_com: number
	usb2: number
	usb3_gen1: number
	usb3_gen2: number
	usb3_gen2x2: number
}

export interface ExpansionSlot {
	x16: number
	x8: number
	x4: number
	x1: number
	pci_legacy: number
	agp_slot: number
}

export interface UsbHeader {
	usb2: number
	usb3_gen1: number
	usb3_gen2: number
	usb3_gen2x2: number
	serial_header: number
}

export interface StorageConnector {
	sata_3gb: number
	sata_6gb: number
	m2_slots: number
	ide_pata: number
	floppy: number
}

export interface Video {
	vga: number
	dvi: number
	hdmi: number
	displayport: number
}
