import { fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { functionService, getRpcMetaData, triggerService } from '@/server';
import type { BriefFunction } from '@/server/rpc/function_service';

export const load: PageServerLoad = async (event) => {
	const briefFunctionsStream = functionService.getFunctions(
		{},
		{ metadata: getRpcMetaData(event) }
	);
	const briefFunctions = [];
	for await (const briefFunction of briefFunctionsStream) {
		briefFunctions.push(briefFunction);
	}

	return {
		user: event.locals.user,
		briefFunctions
	};
};

type CreateTriggerFormData = {
	functionId: FormDataEntryValue;
	cronExpression: FormDataEntryValue;
	description: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	createTrigger: async (
		event: RequestEvent
	): Promise<CreateTriggerFormData | ActionFailure<CreateTriggerFormData> | Redirect> => {
		const { request } = event;
		const formData = await request.formData();
		const cronExpression = formData.get('cronExpression') ?? '';
		const functionId = formData.get('functionId') ?? '';
		const description = formData.get('description') ?? '';

		const createTriggerResponse: CreateTriggerFormData = {
			functionId,
			cronExpression,
			description
		};

		try {
			await triggerService.createCrontabTrigger(
				{
					functionId: parseInt(functionId.toString(), 10),
					cronExpression: cronExpression.toString(),
					description: description.toString()
				},
				{ metadata: getRpcMetaData(event) }
			);
		} catch (e) {
			if (e instanceof Error) {
				console.error(e);
				return fail(400, { ...createTriggerResponse, errorMessage: e.message });
			}
			return createTriggerResponse;
		}
		return redirect(303, '/dashboard/triggers');
	}
};
