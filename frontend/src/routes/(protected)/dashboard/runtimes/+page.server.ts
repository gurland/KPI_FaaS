import type { PageServerLoadEvent } from './$types';
import { getRpcMetaData, runtimeService } from '@/server';

export async function load(event: PageServerLoadEvent) {
	const runtimesStream = runtimeService.getRuntimeTags({}, { metadata: getRpcMetaData(event) });
	const runtimes = [];
	for await (const runtime of runtimesStream) {
		runtimes.push(runtime);
	}
	return {
		runtimes
	};
}
