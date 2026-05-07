import { ramType } from "../constants/index.constant"
import { Part } from "./part.model"

export interface Ram {
	_id?: string
	manufacturer: string
	model: string
	ram_type: ramType
	modules: RamModule[]
	speed: number
	cas_latency: number
	voltage: number
	price: number
	partType: Part
	slug: string

	createdAt?: string
	updatedAt?: string
}

export interface RamModule {
	size: string
	quantity: number
}
