import { cpuManufacturer, gpuType } from '../constants/index.constant';

export const BRAND_COLORS: Record<string, string> = {
	intel: '#0071c5',
	amd: '#ed1c24',
	nvidia: '#76b900',
	default: '#9ca3af',
};

export function getBuildIdentity(build: any) {
	const cpuBrand = build.cpu?.manufacturer;
	const gpuKind = build.gpu?.gpu_type;

	const isIntelCpu = cpuBrand === cpuManufacturer.intel;
	const isAmdCpu = cpuBrand === cpuManufacturer.amd;

	const isNvidiaGpu = gpuKind === gpuType.nvidia;
	const isAmdGpu = gpuKind === gpuType.amd;
	const isIntelGpu = gpuKind === gpuType.intel;

	const cpuKey = isIntelCpu ? 'intel' : isAmdCpu ? 'amd' : 'default';
	const gpuKey = isNvidiaGpu ? 'nvidia' : isAmdGpu ? 'amd' : isIntelGpu ? 'intel' : 'default';

	return {
		cpuColor: BRAND_COLORS[cpuKey],
		gpuColor: BRAND_COLORS[gpuKey],

		// Clases de Tailwind para aplicar colores directamente
		cpuClass: isIntelCpu ? 'text-blue-500' : isAmdCpu ? 'text-red-500' : 'text-base-content/50',
		gpuClass: isNvidiaGpu
			? 'text-green-500'
			: isAmdGpu
				? 'text-red-500'
				: isIntelGpu
					? 'text-blue-500'
					: 'text-base-content/50',

		// Bordes por si los usas en cards
		cpuBorder: isIntelCpu ? 'border-l-blue-500' : isAmdCpu ? 'border-l-red-500' : 'border-l-base-300',
		gpuBorder: isNvidiaGpu ? 'border-r-green-500' : isAmdGpu || isIntelGpu ? 'border-r-red-500' : 'border-r-base-300',
	};
}
