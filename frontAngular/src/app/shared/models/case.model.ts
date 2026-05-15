import { caseType, moboFormFactor } from '../constants/index.constant';
import { Part } from './part.model';

export interface Case {
	_id?: string;
	manufacturer: string;
	model: string;
	case_type: caseType;
	volume: number;
	form_factor: moboFormFactor;
	front_panel: FrontPanel;
	internal_bays: InternalBay;
	power_supply: boolean;
	color: string;
	price: number;
	partType: Part;
	slug: string;

	active: boolean;

	createdAt?: string;
	updatedAt?: string;
}

export interface FrontPanel {
	usb2TypA: number;
	usb3gen1A: number;
	usb32gen2x2C: number;
	usb3gen2C: number;
	usb3gen1C: number;
}

export interface InternalBay {
	int35: number;
	int25: number;
}
