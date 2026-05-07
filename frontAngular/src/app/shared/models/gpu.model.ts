import { externalPower, gddrType, gpuType, interfaceType, syncType } from '../constants/index.constant';
import { Part } from './part.model';

export interface Gpu {
	_id?: string;
	manufacturer: string;
	model: string;
	gpu_type: gpuType;
	base_freq: number;
	boost_freq: number;
	memory: number;
	memory_type: gddrType;
	interface: interfaceType;
	frame_sync: syncType;
	tdp: number;
	ports: GpuPorts;
	external_power: externalPower;
	price: number;
	partType: Part;
	slug: string;

	createdAt?: string;
	updatedAt?: string;
}

export interface GpuPorts {
	vga: number;
	dvi: number;
	hdmi: number;
	displayport: number;
}
