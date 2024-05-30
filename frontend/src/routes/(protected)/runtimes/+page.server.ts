import type { PageServerLoadEvent } from './$types';
import { UserRole, getRpcMetaData, runtimeService } from '@/server';

export async function load(event: PageServerLoadEvent) {
	const runtimesStream = runtimeService.getRuntimeTags({}, { metadata: getRpcMetaData(event) });
	const runtimes = [];
	for await (const runtime of runtimesStream) {
		runtimes.push(runtime);
	}

	const isAdmin = event.locals.user?.role === UserRole.ADMIN;

	return {
		isAdmin,
		runtimes
	};
}
