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
	syntax: FormDataEntryValue;
	invokerScript: FormDataEntryValue;
	functionExample: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	createRuntime: async (
		event: RequestEvent
	): Promise<ActionFailure<CreateRuntimeFormData> | Redirect> => {
		const { request } = event;
		const formData = await request.formData();
		const tag = formData.get('tag') ?? '';
		const dockerfile = formData.get('dockerfile') ?? '';
		const syntax = formData.get('syntax') ?? '';
		const invokerScript = formData.get('invokerScript') ?? '';
		const functionExample = formData.get('functionExample') ?? '';

		const createRuntimeResponse: CreateRuntimeFormData = {
			tag,
			dockerfile,
			syntax,
			invokerScript,
			functionExample
		};

		try {
			await runtimeService.createRuntime(
				{
					tag: tag.toString(),
					dockerfile: dockerfile.toString(),
					syntax: syntax.toString(),
					invokerScript: invokerScript.toString(),
					functionExample: functionExample.toString()
				},
				{ metadata: getRpcMetaData(event) }
			);
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { ...createRuntimeResponse, errorMessage: e.message });
			}
		}
		return redirect(303, '/runtimes');
	}
};
