import type { BriefFunction } from '@/server/rpc/function_service';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
	return {
		briefFunctions: [] as BriefFunction[]
	};
}
