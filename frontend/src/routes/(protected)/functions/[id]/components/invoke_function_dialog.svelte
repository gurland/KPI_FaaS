<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { CircleAlert, LoaderCircleIcon } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { DetailedFunction } from '@/server/rpc/function_service';
	import type { BriefRuntime } from '@/server/rpc/runtime_service';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
	import { RichTextEditor } from '@/components/external/rich-text-editor';
	import Highlight from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import 'svelte-highlight/styles/atom-one-dark.css';

	export let userId: number;
	export let clientIp: string;
	export let userAgent: string | null;
	export let functionDetailed: DetailedFunction;
	export let briefRuntime: BriefRuntime;
	export let jsonTriggerContext: string;
	export let errorMessage: string | undefined;
	export let resultJSON: string | undefined;
	export let logLines: string[];

	const functionConfiguration = {
		userId: userId,
		functionName: functionDetailed.functionName,
		runtimeTag: functionDetailed.runtimeTag,
		requestId: crypto.randomUUID()
	};

	const contextData = JSON.stringify(
		{
			method: 'POST',
			path: '/api/v1/resource',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer XXX',
				'User-Agent': userAgent,
				Accept: 'application/json'
			},
			queryStringParameters: {
				param1: 'value1',
				param2: 'value2'
			},
			body: {
				key1: 'value1'
			},
			bodyType: 'application/json',
			isBodyB64Encoded: false,
			sourceIp: clientIp,
			functionConfiguration
		},
		null,
		2
	);

	let contextDataCode = jsonTriggerContext || contextData;

	const handleContextDataCodeChange = (code: string) => {
		contextDataCode = code;
	};

	let isFormLoading: boolean;

	const handleSubmit: SubmitFunction = ({ formData, action }) => {
		isFormLoading = true;
		formData.set('jsonTriggerContext', contextDataCode);
		formData.set('functionDetailed', JSON.stringify(functionDetailed));
		formData.set('runtimeDetailed', JSON.stringify(briefRuntime));

		return async ({ update }) => {
			isFormLoading = false;
			update();
		};
	};
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button variant="secondary" class="w-full" disabled={isFormLoading}>Invoke function</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-full max-w-5xl overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Invoke function "{functionDetailed?.functionName}"</Dialog.Title>
		</Dialog.Header>
		{#if errorMessage}
			<Alert variant="destructive" class="mt- mx-auto mb-4 mt-4 min-w-full">
				<CircleAlert class="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{errorMessage}</AlertDescription>
			</Alert>
		{/if}
		<form
			class="m-auto grid min-w-full items-center gap-6"
			method="post"
			use:enhance={handleSubmit}
		>
			<fieldset class="grid gap-6 rounded-lg border p-4">
				<div class="grid gap-3">
					<Label>Context data</Label>
					<RichTextEditor
						defaultLanguage="json"
						defaultValue={contextDataCode}
						onChange={handleContextDataCodeChange}
					/>
				</div>
				<Button type="submit" formaction="?/invokeFunction" disabled={isFormLoading}>
					{#if isFormLoading}
						<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Invoke function
				</Button>
			</fieldset>
		</form>
		<div>
			{#if logLines.length > 0}
				<h2 class="mb-2 text-lg font-semibold">Logs</h2>
				<div class="max-h-52 overflow-y-auto text-sm text-gray-500">
					{#each logLines as logLine}
						<p class="mb-2">{JSON.stringify(logLine)}</p>
					{/each}
				</div>
			{/if}
			{#if resultJSON}
				<h2 class="mb-2 text-lg font-semibold">Result</h2>
				<div class="max-h-52 overflow-y-auto text-sm text-gray-500">
					<Highlight language={json} code={resultJSON} />
				</div>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
