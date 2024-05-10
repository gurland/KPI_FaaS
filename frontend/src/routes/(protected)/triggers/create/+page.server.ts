import { fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import {
	getRpcMetaData,
	crontabTriggerService,
	apiGatewayTriggerService,
	functionService
} from '@/server';

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
	triggerType: FormDataEntryValue;
	functionId: FormDataEntryValue;
	cronExpression: FormDataEntryValue;
	description: FormDataEntryValue;
	name: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	createTrigger: async (
		event: RequestEvent
	): Promise<ActionFailure<CreateTriggerFormData> | Redirect> => {
		const { request } = event;
		const formData = await request.formData();
		const triggerType = formData.get('triggerType') ?? '';
		const cronExpression = formData.get('cronExpression') ?? '';
		const functionId = formData.get('functionId') ?? '';
		const description = formData.get('description') ?? '';
		const name = formData.get('name') ?? '';

		const createTriggerResponse: CreateTriggerFormData = {
			triggerType,
			functionId,
			cronExpression,
			description,
			name
		};

		try {
			const functionIdInt = parseInt(functionId.toString(), 10);
			if (triggerType === 'cron') {
				await crontabTriggerService.createCrontabTrigger(
					{
						functionId: functionIdInt,
						cronExpression: cronExpression.toString(),
						description: description.toString()
					},
					{ metadata: getRpcMetaData(event) }
				);
			}

			if (triggerType === 'http') {
				await apiGatewayTriggerService.createAPIGatewayTrigger(
					{
						functionId: functionIdInt,
						name: name.toString()
					},
					{ metadata: getRpcMetaData(event) }
				);
			}
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { ...createTriggerResponse, errorMessage: e.message });
			}
		}
		return redirect(303, '/triggers');
	}
};
