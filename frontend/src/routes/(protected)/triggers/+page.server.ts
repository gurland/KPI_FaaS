import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';
import { apiGatewayTriggerService, crontabTriggerService, getRpcMetaData } from '@/server';
import { fail, redirect, type ActionFailure } from '@sveltejs/kit';

export async function load(event: PageServerLoadEvent) {
	const crontabTriggersStream = crontabTriggerService.getAllCrontabTriggers(
		{},
		{ metadata: getRpcMetaData(event) }
	);
	const crontabTriggers = [];
	for await (const crontabTrigger of crontabTriggersStream) {
		crontabTriggers.push(crontabTrigger);
	}

	const apiGatewayTriggerStream = apiGatewayTriggerService.getAllAPIGatewayTriggers(
		{},
		{ metadata: getRpcMetaData(event) }
	);
	const apiGatewayTriggers = [];
	for await (const apiGatewayTrigger of apiGatewayTriggerStream) {
		apiGatewayTriggers.push(apiGatewayTrigger);
	}

	return {
		crontabTriggers,
		apiGatewayTriggers
	};
}

type TriggerDeletionResponse = {
	errorMessage?: string;
};

export const actions: Actions = {
	deleteCronTrigger: async (
		event: RequestEvent
	): Promise<ActionFailure<TriggerDeletionResponse> | void> => {
		const { url } = event;
		const triggerIdStr = url.searchParams.get('triggerId');
		try {
			if (triggerIdStr) {
				const triggerId = parseInt(triggerIdStr, 10);
				await crontabTriggerService.deleteCrontabTrigger(
					{
						triggerId
					},
					{ metadata: getRpcMetaData(event) }
				);
			}
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { errorMessage: e.message });
			}
		}

		return redirect(303, '/triggers');
	},
	deleteHTTPTrigger: async (
		event: RequestEvent
	): Promise<ActionFailure<TriggerDeletionResponse> | void> => {
		const { url } = event;
		const triggerIdStr = url.searchParams.get('triggerId');
		try {
			if (triggerIdStr) {
				const triggerId = parseInt(triggerIdStr, 10);
				await apiGatewayTriggerService.deleteAPIGatewayTrigger(
					{
						triggerId
					},
					{ metadata: getRpcMetaData(event) }
				);
			}
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { errorMessage: e.message });
			}
		}

		return redirect(303, '/triggers');
	}
};
