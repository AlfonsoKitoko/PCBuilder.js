export enum gpuType {
	intel = 'INTEL',
	amd = 'AMD RADEON',
	nvidia = 'NVIDIA',
}
export enum syncType {
	freesync = 'AMD FREESYNC',
	g_sync = 'NVIDIA G-SYNC',
	none = 'NONE',
}
export enum externalPower {
	'none' = 'NONE',
	'1xpcie6pin' = '1 X PCIE 6-PIN',
	'2xpcie6pin' = '2 X PCIE 6-PIN',
	'1xpcie8pin' = '1 X PCIE 8-PIN',
	'1xpcie8pin1xpcie6pin' = '1 X PCIE 8-PIN + 1 X PCIE 6-PIN',
	'2xpcie8pin' = '2 X PCIE 8-PIN',
	'2xpcie8pin1xpcie6pin' = '2 X PCIE 8-PIN + 1 X PCIE 6-PIN',
	'3xpcie8pin' = '3 X PCIE 8-PIN',
	'4xpcie8pin' = '4 X PCIE 8-PIN',
	'1xpcie12pin' = '1 X PCIE 12-PIN',
	'1xpcie16pin12vhpwr' = '1 X PCIE 16-PIN 12VHPWR',
	'2xpcie16pin12vhpwr' = '2 X PCIE 16-PIN 12VHPWR',
	'1xeps8pin' = '1 X EPS 8-PIN',
}

export enum interfaceType {
	'AGP' = 'AGP',
	'PCI' = 'PCI',
	'PCIE X1' = 'PCIE X1',
	'PCIE X8' = 'PCIE X8',
	'PCIE X16' = 'PCIE X16',
	'PCIE X16 GC-HPWR' = 'PCIE X16 GC-HPWR',
}
