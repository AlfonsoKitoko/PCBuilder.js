import { pcParts } from '../constants/index.constant';

export interface Part {
	_id?: string;
	name: pcParts;
	slug: string;

	createdAt?: string;
	updatedAt?: string;
}
