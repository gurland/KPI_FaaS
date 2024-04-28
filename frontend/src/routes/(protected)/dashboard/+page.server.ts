import { fail, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
import { getRpcMetaData, runtimeService } from '@/server/index.js';

export function load({ locals }) {
	return {
		user: locals.user
	};
}

type CreateRuntimeFormData = {
	tag: string;
	dockerfile: string;
	errorMessage?: string;
};

export const actions: Actions = {
	createRuntime: async (
		event: RequestEvent
	): Promise<CreateRuntimeFormData | ActionFailure<CreateRuntimeFormData> | Redirect> => {
		const { request } = event;
		const signupFormData = await request.formData();
		const tag = signupFormData.get('tag') + '';
		const dockerfile = signupFormData.get('dockerfile') + '';

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
