<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { ChevronLeft, CircleAlert, LoaderCircleIcon } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

	let isFormLoading = false;

	const handleSubmit: SubmitFunction = () => {
		isFormLoading = true;
		return async ({ update }) => {
			isFormLoading = false;
			update();
		};
	};

	export let form: ActionData;
	export let data: PageData;

	const { briefFunctions } = data;
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<Button variant="outline" size="icon" class="mr-4 h-7 w-7" href="./">
		<ChevronLeft class="h-4 w-4" />
		<span class="sr-only">Back</span>
	</Button>
	<h1 class="text-xl font-semibold">Create new trigger</h1>
</header>

<main class="mx-auto grid w-full max-w-lg grid-cols-1 gap-4 overflow-auto p-4">
	{#if form?.errorMessage}
		<Alert variant="destructive" class="mx-auto mb-4 min-w-full">
			<CircleAlert class="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{form?.errorMessage}</AlertDescription>
		</Alert>
	{/if}
	<form
		class="m-auto grid min-w-full items-center gap-6"
		method="post"
		action="?/createTrigger"
		use:enhance={handleSubmit}
	>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<legend class="-ml-1 px-1 text-sm font-medium"> Settings </legend>
			<div class="grid gap-3">
				<Label for="cronExpression">Cron expression</Label>
				<Input
					id="cronExpression"
					name="cronExpression"
					type="text"
					placeholder="Cron expression"
					value={form?.cronExpression?.toString()}
					required
				/>
			</div>

			<div class="grid gap-3">
				<Label for="code">Function</Label>
				<Select.Root portal={null} name="functionId">
					<Select.Trigger id="functionId">
						<Select.Value placeholder="Select a function" />
					</Select.Trigger>
					<Select.Content>
						{#each briefFunctions as briefFunction}
							<Select.Item
								value={briefFunction.functionId}
								label={`${briefFunction.functionName} (${briefFunction.runtimeTag})`}
							></Select.Item>
						{/each}
					</Select.Content>
					<Select.Input value={form?.functionId?.toString()} />
				</Select.Root>
			</div>
			<div class="grid gap-3">
				<Label for="description">Description</Label>
				<Textarea
					id="description"
					name="description"
					placeholder="Trigger description goes here"
					class="min-h-[9.5rem]"
					value={form?.description?.toString()}
				/>
			</div>
			<Button type="submit" class="w-full" disabled={isFormLoading}>
				{#if isFormLoading}
					<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Create runtime
			</Button>
		</fieldset>
	</form>
</main>
