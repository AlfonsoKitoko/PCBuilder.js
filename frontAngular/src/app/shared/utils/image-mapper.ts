import { environment } from '../../../environments/environment.development';

export function getImageUrl(
	categorySlug: string | undefined,
	partSlug?: string | undefined,
	fallbackToCategory: boolean = true,
): string {
	const apiUrl = environment.apiUrl;

	if (!categorySlug || categorySlug === 'no-image') return `/default/no-image.png`;

	const slugMap: Record<string, string> = {
		'no-image': 'no-image.png',
		case: 'case.png',
		storage: 'hard-disk.png',
		mobo: 'motherboard.png',
		motherboard: 'motherboard.png',
		os: 'operative-system.png',
		psu: 'power-supply.png',
		cpu: 'processor.png',
		ram: 'ram.png',
		gpu: 'video-card.png',
		'video-card': 'video-card.png',
	};

	if (!partSlug && !fallbackToCategory) return `/default/no-image.png`;

	if (partSlug) return `${apiUrl}/public/${categorySlug}/${partSlug}.png`;

	const imgName = slugMap[categorySlug];

	return imgName ? `/default/${imgName}` : `/default/no-image.png`;
}
