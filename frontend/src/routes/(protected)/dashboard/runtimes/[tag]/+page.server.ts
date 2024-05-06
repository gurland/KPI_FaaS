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
	): Promise<UpdateRuntimeFormData | ActionFailure<UpdateRuntimeFormData> | Redirect> => {
		const { request, params } = event;

		const signupFormData = await request.formData();
		const dockerfile = signupFormData.get('dockerfile') ?? '';

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
				console.error(e);
				return fail(400, { ...updateRuntimeResponse, errorMessage: e.message });
			}
			return updateRuntimeResponse;
		}
		return redirect(303, '/dashboard/runtimes');
	}
};
