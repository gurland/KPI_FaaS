import { fail, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
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

type CreateRuntimeFormData = {
	tag: FormDataEntryValue;
	dockerfile: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	createRuntime: async (
		event: RequestEvent
	): Promise<CreateRuntimeFormData | ActionFailure<CreateRuntimeFormData> | Redirect> => {
		const { request } = event;
		const signupFormData = await request.formData();
		const tag = signupFormData.get('tag') ?? '';
		const dockerfile = signupFormData.get('dockerfile') ?? '';

		const createRuntimeResponse: CreateRuntimeFormData = {
			tag,
			dockerfile
		};

		try {
			await runtimeService.createRuntime(
				{
					tag: tag.toString(),
					dockerfile: dockerfile.toString()
				},
				{ metadata: getRpcMetaData(event) }
			);
		} catch (e) {
			if (e instanceof Error) {
				console.error(e);
				return fail(400, { ...createRuntimeResponse, errorMessage: e.message });
			}
		}

		return createRuntimeResponse;
	}
};
