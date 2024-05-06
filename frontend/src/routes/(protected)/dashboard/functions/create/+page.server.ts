import { fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { functionService, getRpcMetaData, runtimeService } from '@/server';

export const load: PageServerLoad = async (event) => {
	const briefRuntimesStream = runtimeService.getRuntimeTags(
		{},
		{ metadata: getRpcMetaData(event) }
	);
	const briefRuntimes = [];
	for await (const briefRuntime of briefRuntimesStream) {
		briefRuntimes.push(briefRuntime);
	}

	return {
		user: event.locals.user,
		briefRuntimes
	};
};

type CreateFunctionFormData = {
	functionName: FormDataEntryValue;
	runtimeTag: FormDataEntryValue;
	code: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	createFunction: async (
		event: RequestEvent
	): Promise<CreateFunctionFormData | ActionFailure<CreateFunctionFormData> | Redirect> => {
		const { request } = event;
		const signupFormData = await request.formData();
		const runtimeTag = signupFormData.get('runtimeTag') ?? '';
		const functionName = signupFormData.get('functionName') ?? '';
		const code = signupFormData.get('code') ?? '';

		const createFunctionResponse: CreateFunctionFormData = {
			functionName,
			runtimeTag,
			code
		};

		try {
			await functionService.createFunction(
				{
					functionName: functionName.toString(),
					runtimeTag: runtimeTag.toString(),
					code: code.toString()
				},
				{ metadata: getRpcMetaData(event) }
			);
		} catch (e) {
			if (e instanceof Error) {
				console.error(e);
				return fail(400, { ...createFunctionResponse, errorMessage: e.message });
			}
			return createFunctionResponse;
		}
		return redirect(303, '/dashboard/functions');
	}
};
