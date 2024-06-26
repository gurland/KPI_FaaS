<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { ChevronLeft, CircleAlert, LoaderCircleIcon, TrashIcon } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
	import Table from '@/components/ui/table/table.svelte';
	import TableBody from '@/components/ui/table/table-body.svelte';
	import TableRow from '@/components/ui/table/table-row.svelte';
	import TableCell from '@/components/ui/table/table-cell.svelte';
	import { InvokeFunctionDialog } from './components';
	import { RichTextEditor } from '@/components/external/rich-text-editor';
	import type { Language } from '@/syntax';
	import type { Selected } from 'bits-ui';

	export let form: ActionData;
	export let data: PageData;

	const {
		user,
		clientIp,
		userAgent,
		runtimes = [],
		functionDetailed,
		apiGatewayTriggers = [],
		crontabTriggers = []
	} = data;

	let isUpdating = false;
	let isDeleting = false;
	let runtimeTag = form?.runtimeTag ?? functionDetailed?.runtimeTag ?? '';
	let functionCode = functionDetailed?.code ?? '';

	const handleFunctionCodeChange = (code: string) => {
		functionCode = code;
	};

	const handleRuntimeTagChange = (selected?: Selected<string>) => {
		if (typeof selected?.value === 'string') {
			runtimeTag = selected.value;
		}
	};

	const handleSubmit: SubmitFunction = ({ formData, action }) => {
		if (action.search.startsWith('?/updateFunction')) {
			isUpdating = true;
			formData.set('code', functionCode);
			formData.set('runtimeTag', runtimeTag);
		} else if (action.search.startsWith('?/deleteFunction')) {
			isDeleting = true;
		}

		return async ({ update }) => {
			isUpdating = false;
			isDeleting = false;
			update();
		};
	};

	$: isFormLoading = isUpdating || isDeleting;
	$: selectedRuntime = runtimes.find((it) => it.tag === runtimeTag);
	$: syntax = selectedRuntime?.syntax as Language;
	$: logLines = JSON.parse(form?.logJSON ?? '[]') as string[];
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<Button variant="outline" size="icon" class="mr-4 h-7 w-7" href="./">
		<ChevronLeft class="h-4 w-4" />
		<span class="sr-only">Back</span>
	</Button>
	<h1 class="text-xl font-semibold">Edit function</h1>
</header>

<main class="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 overflow-auto p-4">
	{#if form?.errorMessage && !form?.isInvokeFunctionError}
		<Alert variant="destructive" class="mx-auto mb-4 min-w-full">
			<CircleAlert class="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{form?.errorMessage}</AlertDescription>
		</Alert>
	{/if}
	<form class="m-auto grid min-w-full items-center gap-6" method="post" use:enhance={handleSubmit}>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<div class="grid gap-3">
				<Label for="code">Runtime</Label>
				<Select.Root
					portal={null}
					name="runtimeTag"
					selected={{
						value: (form?.runtimeTag ?? functionDetailed?.runtimeTag ?? '').toString(),
						label: runtimes.find(
							(runtime) => runtime.tag === (form?.runtimeTag ?? functionDetailed?.runtimeTag ?? '')
						)?.tag
					}}
					onSelectedChange={handleRuntimeTagChange}
				>
					<Select.Trigger id="runtimeTag">
						<Select.Value placeholder="Select a runtime" />
					</Select.Trigger>
					<Select.Content>
						{#each runtimes as runtime}
							<Select.Item
								value={runtime.tag}
								label={`${runtime.tag} (url: ${runtime.registryUrl}; target: ${runtime.syntax})`}
							/>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<div class="grid gap-3">
				<Label>Code</Label>
				<RichTextEditor
					defaultLanguage={syntax}
					defaultValue={functionCode}
					onChange={handleFunctionCodeChange}
				/>
			</div>

			<Button type="submit" formaction="?/updateFunction" class="w-full" disabled={isFormLoading}>
				{#if isUpdating}
					<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Update function
			</Button>

			{#if functionDetailed && selectedRuntime && user}
				<InvokeFunctionDialog
					{functionDetailed}
					runtime={selectedRuntime}
					{clientIp}
					{userAgent}
					{logLines}
					jsonTriggerContext={(form?.jsonTriggerContext ?? '').toString()}
					userId={user.userId}
					errorMessage={form?.isInvokeFunctionError ? form?.errorMessage : undefined}
					resultJSON={form?.resultJSON}
				/>
			{/if}

			<Button
				type="submit"
				variant="destructive"
				formaction="?/deleteFunction"
				class="w-full"
				disabled={isFormLoading}
			>
				{#if isDeleting}
					<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Delete function
			</Button>
		</fieldset>

		<fieldset class="grid gap-6 rounded-lg border p-4">
			<legend>
				Triggers
				<Button
					variant="link"
					size="sm"
					href={`/triggers/create?functionId=${functionDetailed?.functionId}`}>Add new</Button
				>
			</legend>

			<Table>
				<TableBody>
					{#each apiGatewayTriggers as apiGatewayTrigger, i (i)}
						<TableRow>
							<TableCell>HTTP</TableCell>
							<TableCell>{apiGatewayTrigger.name}</TableCell>
							<TableCell>{apiGatewayTrigger.url}</TableCell>
							<TableCell>
								<Button
									formaction={`?/deleteHTTPTrigger&triggerId=${apiGatewayTrigger.triggerId}`}
									type="submit"
									variant="destructive"
									size="icon"
								>
									<TrashIcon />
								</Button>
							</TableCell>
						</TableRow>
					{/each}
					{#each crontabTriggers as crontabTrigger, i (i)}
						<TableRow>
							<TableCell>Cron</TableCell>
							<TableCell>{crontabTrigger.description}</TableCell>
							<TableCell>{crontabTrigger.cronExpression}</TableCell>
							<TableCell>
								<Button
									formaction={`?/deleteCronTrigger&triggerId=${crontabTrigger.triggerId}`}
									type="submit"
									variant="destructive"
									size="icon"
								>
									<TrashIcon />
								</Button>
							</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</fieldset>
	</form>
</main>
