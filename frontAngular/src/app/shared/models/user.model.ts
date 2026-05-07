export interface User {
	_id?: string;
	username: string;
	password: string;
	firstName?: string;
	lastName?: string;
	email: string;
	birthDate: string;
	profile: userProfile;
	slug: string;

	createdAt?: string;
	updatedAt?: string;
}

export enum userProfile {
	ADMIN = 'ADMIN',
	USER = 'USER',
}
