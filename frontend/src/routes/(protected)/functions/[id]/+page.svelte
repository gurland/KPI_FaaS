<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
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

	let isUpdating = false;
	let isDeleting = false;

	const handleSubmit: SubmitFunction = ({ formData, action }) => {
		if (action.search.startsWith('?/updateFunction')) {
			isUpdating = true;
			if (formData.get('code')?.toString().trim() !== functionDetailed?.code.trim()) {
				formData.set('codeChanged', 'true');
			}

			if (formData.get('runtimeTag') !== functionDetailed?.runtimeTag) {
				formData.set('runtimeTagChanged', 'true');
			}
		} else if (action.search.startsWith('?/deleteFunction')) {
			isDeleting = true;
		}

		return async ({ update, action }) => {
			isUpdating = false;
			isDeleting = false;
			update();
		};
	};

	export let form: ActionData;
	export let data: PageData;

	const {
		briefRuntimes = [],
		functionDetailed,
		apiGatewayTriggers = [],
		crontabTriggers = []
	} = data;

	$: isFormLoading = isUpdating || isDeleting;
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<Button variant="outline" size="icon" class="mr-4 h-7 w-7" href="./">
		<ChevronLeft class="h-4 w-4" />
		<span class="sr-only">Back</span>
	</Button>
	<h1 class="text-xl font-semibold">Edit function</h1>
</header>

<main class="mx-auto grid w-full max-w-xl grid-cols-1 gap-4 overflow-auto p-4">
	{#if form?.errorMessage}
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
						label: briefRuntimes.find(
							(runtime) => runtime.tag === (form?.runtimeTag ?? functionDetailed?.runtimeTag ?? '')
						)?.tag
					}}
				>
					<Select.Trigger id="runtimeTag">
						<Select.Value placeholder="Select a runtime" />
					</Select.Trigger>
					<Select.Content>
						{#each briefRuntimes as briefRuntime}
							<Select.Item
								value={briefRuntime.tag}
								label={`${briefRuntime.tag} (${briefRuntime.registryUrl})`}
							></Select.Item>
						{/each}
					</Select.Content>
					<Select.Input
						value={(form?.runtimeTag ?? functionDetailed?.runtimeTag ?? '').toString()}
					/>
				</Select.Root>
			</div>
			<div class="grid gap-3">
				<Label for="code">Code</Label>
				<Textarea
					id="code"
					name="code"
					placeholder="Function code goes here"
					class="min-h-[9.5rem]"
					value={(form?.code ?? functionDetailed?.code ?? '').toString()}
				/>
			</div>
			<Button type="submit" formaction="?/updateFunction" class="w-full" disabled={isFormLoading}>
				{#if isUpdating}
					<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Update runtime
			</Button>
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
				Delete runtime
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
