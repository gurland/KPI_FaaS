import { error, fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { getRpcMetaData, runtimeService } from '@/server';

export const load: PageServerLoad = async (event) => {
	try {
		const detailedRuntime = await runtimeService.getRuntimeDetails(
			{ tag: event.params.tag },
			{ metadata: getRpcMetaData(event) }
		);
		return {
			detailedRuntime,
			user: event.locals.user
		};
	} catch (e) {
		if (e instanceof Error) {
			throw error(404, { message: e.message });
		}
	}
};

type UpdateRuntimeFormData = {
	dockerfile: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	updateRuntime: async (
		event: RequestEvent
	): Promise<ActionFailure<UpdateRuntimeFormData> | Redirect> => {
		const { request, params } = event;

		const formData = await request.formData();
		const dockerfile = formData.get('dockerfile') ?? '';

		const updateRuntimeResponse: UpdateRuntimeFormData = {
			dockerfile
		};

		try {
			await runtimeService.editRuntime(
				{
					tag: params.tag,
					dockerfile: dockerfile.toString()
				},
				{ metadata: getRpcMetaData(event) }
			);
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { ...updateRuntimeResponse, errorMessage: e.message });
			}
		}
		return redirect(303, '/runtimes');
	}
};
