import { cpuManufacturer } from "../constants/index.constant"
import { Part } from "./part.model"

export interface Cpu {
	_id?: string
	manufacturer: cpuManufacturer
	model: string
	series: string
	microarchitecture: string
	family: string
	socket: string
	core_count: number
	thread_count: number
	base_freq: number
	boost_freq: number
	l1_cache?: number
	l2_cache: number
	l3_cache: number
	tdp: number
	hasIntegrated: boolean
	integrated_graphics?: string | null
	price: number
	partType: Part
	slug: string

	createdAt?: string
	updatedAt?: string
}
