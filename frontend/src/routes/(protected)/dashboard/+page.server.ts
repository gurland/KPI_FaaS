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

		console.log('createRuntimeResponse', createRuntimeResponse);
		//let runtime: Runtime | undefined;

		try {
			const runtime = await runtimeService.createRuntime(
				{
					tag: tag.toString(),
					dockerfile: dockerfile.toString()
				},
				{ metadata: getRpcMetaData(event) }
			);
			console.log('runtime', runtime);
		} catch (e) {
			if (e instanceof Error) {
				console.error('createRuntime', e);
				return fail(400, { ...createRuntimeResponse, errorMessage: e.message });
			}
		}

		return createRuntimeResponse;
	}
};
