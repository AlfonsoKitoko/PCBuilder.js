import { effRating, modular, psuType } from '../constants/index.constant';
import { Part } from './part.model';

export interface Psu {
	_id?: string;
	manufacturer: string;
	model: string;
	psu_type: psuType;
	wattage: number;
	eff_rating: effRating;
	modular: modular;
	connectors: PsuConnector;
	price: number;
	partType: Part;
	slug: string;

	createdAt?: string;
	updatedAt?: string;
}

export interface PsuConnector {
	atx_24pin: number;
	eps_8pin: number;
	eps_4pin: number;
	pcie_16pin_12vhpwr: number;
	pcie_8pin: number;
	pcie_6plus2pin: number;
	pcie_6pin: number;
	sata: number;
	molex_4pin: number;
}
