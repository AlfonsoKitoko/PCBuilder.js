import { osMode } from '../constants/index.constant';
import { Part } from './part.model';

export interface Os {
	_id?: string;
	manufacturer: string;
	version: string;
	edition: string;
	mode: osMode;
	price: number;
	partType: Part;
	slug: string;

	active: boolean;

	createdAt?: string;
	updatedAt?: string;
}
