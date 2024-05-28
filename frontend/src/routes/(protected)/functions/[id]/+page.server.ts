import { error, fail, redirect, type ActionFailure, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import {
	apiGatewayTriggerService,
	crontabTriggerService,
	functionService,
	getRpcMetaData,
	loadBalancerService,
	runtimeService
} from '@/server';
import type { DetailedFunction } from '@/server/rpc/function_service';
import type { DetailedRuntime } from '@/server/rpc/runtime_service';

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

		const crontabTriggersStream = crontabTriggerService.getCrontabTriggers(
			{ functionId },
			{ metadata: getRpcMetaData(event) }
		);
		const crontabTriggers = [];
		for await (const crontabTrigger of crontabTriggersStream) {
			crontabTriggers.push(crontabTrigger);
		}

		const apiGatewayTriggersStream = apiGatewayTriggerService.getAPIGatewayTriggers(
			{ functionId },
			{ metadata: getRpcMetaData(event) }
		);
		const apiGatewayTriggers = [];
		for await (const apiGatewayTrigger of apiGatewayTriggersStream) {
			apiGatewayTriggers.push(apiGatewayTrigger);
		}

		return {
			clientIp: event.getClientAddress(),
			userAgent: event.request.headers.get('user-agent'),
			user: event.locals.user,
			functionDetailed,
			briefRuntimes,
			crontabTriggers,
			apiGatewayTriggers
		};
	} catch (e) {
		if (e instanceof Error) {
			throw error(404, { message: e.message });
		}
	}
};

type BaseFormData = {
	isInvokeFunctionError?: boolean;
	errorMessage?: string;
};

type UpdateFunctionFormData = BaseFormData & {
	runtimeTag: FormDataEntryValue;
	code: FormDataEntryValue;
	runtimeTagChanged?: boolean;
	codeChanged?: boolean;
};

type InvokeFunctionFormData = BaseFormData & {
	jsonTriggerContext: FormDataEntryValue;
	resultJSON: string | undefined;
	logJSON: string | undefined;
};

type DeleteFunctionFormData = BaseFormData;

type DeleteTriggerFormData = BaseFormData;

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
	invokeFunction: async (
		event: RequestEvent
	): Promise<ActionFailure<InvokeFunctionFormData> | InvokeFunctionFormData> => {
		const { request } = event;

		const formData = await request.formData();
		const jsonTriggerContext = formData.get('jsonTriggerContext') ?? '';
		const functionDetailedJson = formData.get('functionDetailed')?.toString();
		const runtimeDetailedJson = formData.get('runtimeDetailed')?.toString();

		const invokeFunctionResponse: InvokeFunctionFormData = {
			jsonTriggerContext,
			resultJSON: undefined,
			logJSON: undefined
		};

		try {
			const functionDetailed = JSON.parse(functionDetailedJson ?? '') as DetailedFunction;
			const runtimeDetailed = JSON.parse(runtimeDetailedJson ?? '') as DetailedRuntime;
			const request = {
				function: functionDetailed,
				runtime: runtimeDetailed,
				jsonTriggerContext: jsonTriggerContext.toString()
			};

			const result = await loadBalancerService.invokeFunction(request, {
				metadata: getRpcMetaData(event)
			});

			return {
				...invokeFunctionResponse,
				resultJSON: result.json,
				logJSON: JSON.stringify(result.logLines?.logLines ?? [])
			};
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, {
					...invokeFunctionResponse,
					errorMessage: e.message,
					isInvokeFunctionError: true
				});
			}
		}

		return invokeFunctionResponse;
	},
	deleteFunction: async (
		event: RequestEvent
	): Promise<ActionFailure<DeleteFunctionFormData> | Redirect> => {
		const { params } = event;

		const functionId = parseInt(params.id);

		try {
			await functionService.deleteFunction(
				{
					functionId
				},
				{ metadata: getRpcMetaData(event) }
			);
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { errorMessage: e.message });
			}
		}
		return redirect(303, '/functions');
	},
	deleteCronTrigger: async (
		event: RequestEvent
	): Promise<ActionFailure<DeleteTriggerFormData> | void> => {
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
	},
	deleteHTTPTrigger: async (
		event: RequestEvent
	): Promise<ActionFailure<DeleteTriggerFormData> | void> => {
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
	}
};
