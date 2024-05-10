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
	): Promise<ActionFailure<CreateFunctionFormData> | Redirect> => {
		const { request } = event;
		const formData = await request.formData();
		const runtimeTag = formData.get('runtimeTag') ?? '';
		const functionName = formData.get('functionName') ?? '';
		const code = formData.get('code') ?? '';

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
				return fail(400, { ...createFunctionResponse, errorMessage: e.message });
			}
		}
		return redirect(303, '/functions');
	}
};
