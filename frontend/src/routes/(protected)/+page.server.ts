import { UserRole } from '@/server';
import type { PageServerLoadEvent } from './$types';

export function load({ locals }: PageServerLoadEvent) {
	const user = locals.user;
	const isAdmin = user?.role === UserRole.ADMIN;
	return {
		isAdmin,
		user
	};
}
