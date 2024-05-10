import { error, fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { functionService, getRpcMetaData, runtimeService } from '@/server';

export const load: PageServerLoad = async (event) => {
	const functionId = parseInt(event.params.id, 10);
	try {
		const functionDetailed = await functionService.getFunction(
			{ functionId },
			{ metadata: getRpcMetaData(event) }
		);

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
			functionDetailed,
			briefRuntimes
		};
	} catch (e) {
		if (e instanceof Error) {
			throw error(404, { message: e.message });
		}
	}
};

type UpdateFunctionFormData = {
	runtimeTag: FormDataEntryValue;
	code: FormDataEntryValue;
	errorMessage?: string;
	runtimeTagChanged?: boolean;
	codeChanged?: boolean;
};

type DeleteFunctionFormData = UpdateFunctionFormData;

export const actions: Actions = {
	updateFunction: async (
		event: RequestEvent
	): Promise<ActionFailure<UpdateFunctionFormData> | Redirect> => {
		const { request, params } = event;

		const functionId = parseInt(params.id);
		const formData = await request.formData();
		const runtimeTag = formData.get('runtimeTag') ?? '';
		const code = formData.get('code') ?? '';
		const codeChanged = formData.has('code');
		const runtimeTagChanged = formData.has('runtimeTag');

		const updateFunctionResponse: UpdateFunctionFormData = {
			runtimeTag,
			code
		};

		try {
			if (codeChanged) {
				await functionService.changeFunctionCode(
					{
						functionId,
						code: code.toString()
					},
					{ metadata: getRpcMetaData(event) }
				);
			}

			if (runtimeTagChanged) {
				await functionService.changeFunctionRuntime(
					{
						functionId,
						runtimeTag: runtimeTag.toString()
					},
					{ metadata: getRpcMetaData(event) }
				);
			}
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { ...updateFunctionResponse, errorMessage: e.message });
			}
		}
		return redirect(303, '/functions');
	},
	deleteFunction: async (
		event: RequestEvent
	): Promise<ActionFailure<DeleteFunctionFormData> | Redirect> => {
		const { request, params } = event;

		const functionId = parseInt(params.id);
		const formData = await request.formData();
		const runtimeTag = formData.get('runtimeTag') ?? '';
		const code = formData.get('code') ?? '';

		const deleteFunctionResponse: UpdateFunctionFormData = {
			runtimeTag,
			code
		};

		try {
			await functionService.deleteFunction(
				{
					functionId
				},
				{ metadata: getRpcMetaData(event) }
			);
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { ...deleteFunctionResponse, errorMessage: e.message });
			}
		}
		return redirect(303, '/functions');
	}
};
