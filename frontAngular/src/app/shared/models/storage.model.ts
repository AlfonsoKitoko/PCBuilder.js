import { storageFormFactor, storageInterface, storageType } from '../constants/index.constant';
import { Part } from './part.model';

export interface Storage {
	_id?: string;
	manufacturer: string;
	model: string;
	capacity: number;
	type: storageType;
	form_factor: storageFormFactor;
	interface: storageInterface;
	cache: number;
	nvme: boolean;
	price: number;
	partType: Part;
	slug: string;

	active: boolean;

	createdAt?: string;
	updatedAt?: string;
}
