import { fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { getRpcMetaData, runtimeService } from '@/server';

export const load: PageServerLoad = ({ locals }) => {
	return {
		user: locals.user
	};
};

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
		const formData = await request.formData();
		const tag = formData.get('tag') ?? '';
		const dockerfile = formData.get('dockerfile') ?? '';

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
			return createRuntimeResponse;
		}
		return redirect(303, '/dashboard/runtimes');
	}
};
