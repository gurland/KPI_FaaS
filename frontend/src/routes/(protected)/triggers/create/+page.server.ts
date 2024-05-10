import { fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { functionService, getRpcMetaData, crontabTriggerService } from '@/server';

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
	): Promise<ActionFailure<CreateTriggerFormData> | Redirect> => {
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
			await crontabTriggerService.createCrontabTrigger(
				{
					functionId: parseInt(functionId.toString(), 10),
					cronExpression: cronExpression.toString(),
					description: description.toString()
				},
				{ metadata: getRpcMetaData(event) }
			);
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { ...createTriggerResponse, errorMessage: e.message });
			}
		}
		return redirect(303, '/triggers');
	}
};
