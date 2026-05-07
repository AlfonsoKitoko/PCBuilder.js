import { Case } from "./case.model"
import { Cpu } from "./cpu.model"
import { Gpu } from "./gpu.model"
import { Mobo } from "./mobo.model"
import { Os } from "./os.model"
import { Psu } from "./psu.model"
import { Ram } from "./ram.model"
import { Storage } from "./storage.model"

export interface BuildState {
	_id?: string
	cpu: Cpu | null
	mobo: Mobo | null
	ram: Ram[]
	storage: Storage[]
	gpu: Gpu | null | undefined
	case: Case | null
	psu: Psu | null
	os: Os | null | undefined
}
