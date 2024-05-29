import { error, fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { UserRole, getRpcMetaData, runtimeService } from '@/server';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	const isReadOnly = user?.role !== UserRole.ADMIN;
	try {
		const detailedRuntime = await runtimeService.getRuntimeDetails(
			{ tag: event.params.tag },
			{ metadata: getRpcMetaData(event) }
		);
		return {
			detailedRuntime,
			user: event.locals.user,
			isReadOnly
		};
	} catch (e) {
		if (e instanceof Error) {
			throw error(404, { message: e.message });
		}
	}
};

type UpdateRuntimeFormData = {
	dockerfile: FormDataEntryValue;
	syntax: FormDataEntryValue;
	invokerScript: FormDataEntryValue;
	functionExample: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	updateRuntime: async (
		event: RequestEvent
	): Promise<ActionFailure<UpdateRuntimeFormData> | Redirect> => {
		const { request, params } = event;

		const formData = await request.formData();
		const dockerfile = formData.get('dockerfile') ?? '';
		const syntax = formData.get('syntax') ?? '';
		const invokerScript = formData.get('invokerScript') ?? '';
		const functionExample = formData.get('functionExample') ?? '';

		const updateRuntimeResponse: UpdateRuntimeFormData = {
			dockerfile,
			syntax,
			invokerScript,
			functionExample
		};

		try {
			await runtimeService.editRuntime(
				{
					tag: params.tag,
					dockerfile: dockerfile.toString(),
					syntax: syntax.toString(),
					invokerScript: invokerScript.toString(),
					functionExample: functionExample.toString()
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
