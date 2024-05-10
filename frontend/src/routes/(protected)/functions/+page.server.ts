import type { PageServerLoadEvent } from './$types';
import { getRpcMetaData, functionService } from '@/server';

export async function load(event: PageServerLoadEvent) {
	const briefFunctionsStream = functionService.getFunctions(
		{},
		{ metadata: getRpcMetaData(event) }
	);
	const briefFunctions = [];
	for await (const briefFunction of briefFunctionsStream) {
		briefFunctions.push(briefFunction);
	}

	return {
		briefFunctions
	};
}
