import { Case } from './case.model';
import { Cpu } from './cpu.model';
import { Gpu } from './gpu.model';
import { Mobo } from './mobo.model';
import { Os } from './os.model';
import { Psu } from './psu.model';
import { Ram } from './ram.model';
import { Storage } from './storage.model';
import { User } from './user.model';

export interface Build {
	_id?: string;
	name: string;
	description?: string;
	cpu: Cpu;
	mobo: Mobo;
	ram: Ram[];
	storage: Storage[];
	gpu?: Gpu;
	case: Case;
	psu: Psu;
	os?: Os;
	owner: User;
	totalWattage: number;
	totalPrice: number;
	slug: string;

	createdAt?: string;
	updatedAt?: string;
}
