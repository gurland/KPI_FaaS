import type { LayoutServerLoadEvent } from './$types';
import { getRpcMetaData, runtimeService } from '@/server';

export async function load(event: LayoutServerLoadEvent) {
	const runtimesStream = runtimeService.getRuntimeTags({}, { metadata: getRpcMetaData(event) });
	const runtimes = [];
	for await (const briefRuntime of runtimesStream) {
		runtimes.push(briefRuntime);
	}

	return {
		user: event.locals.user,
		runtimes
	};
}
