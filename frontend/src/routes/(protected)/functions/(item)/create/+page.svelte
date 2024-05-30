<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { ChevronLeft, CircleAlert, LoaderCircleIcon } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
	import { RichTextEditor } from '@/components/external/rich-text-editor';
	import type { Selected } from 'bits-ui';
	import type { Language } from '@/syntax';

	export let form: ActionData;
	export let data: PageData;

	const { runtimes } = data;

	let isFormLoading = false;
	let functionCode = '';
	let runtimeTag = '';

	const handleRuntimeTagChange = (selected?: Selected<string>) => {
		if (typeof selected?.value === 'string') {
			runtimeTag = selected.value;
		}
	};

	const handleFunctionCodeChange = (code: string) => {
		functionCode = code;
	};

	const handleSubmit: SubmitFunction = (e) => {
		isFormLoading = true;
		e.formData.append('code', functionCode);
		e.formData.append('runtimeTag', runtimeTag);
		return async ({ update }) => {
			isFormLoading = false;
			update();
		};
	};

	$: selectedRuntime = runtimes.find((runtime) => runtime.tag === runtimeTag);
	$: syntax = selectedRuntime?.syntax as Language;
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<Button variant="outline" size="icon" class="mr-4 h-7 w-7" href="./">
		<ChevronLeft class="h-4 w-4" />
		<span class="sr-only">Back</span>
	</Button>
	<h1 class="text-xl font-semibold">Create new function</h1>
</header>

<main class="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 overflow-auto p-4">
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
		action="?/createFunction"
		use:enhance={handleSubmit}
	>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<div class="grid gap-3">
				<Label for="functionName">Name</Label>
				<Input
					id="functionName"
					name="functionName"
					type="text"
					placeholder="Name of the function"
					value={form?.functionName?.toString()}
					required
				/>
			</div>

			<div class="grid gap-3">
				<Label for="code">Runtime</Label>
				<Select.Root name="runtimeTag" onSelectedChange={handleRuntimeTagChange}>
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
					defaultValue={selectedRuntime?.functionExample}
					onChange={handleFunctionCodeChange}
				/>
			</div>

			<Button type="submit" class="w-full" disabled={isFormLoading}>
				{#if isFormLoading}
					<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Create function
			</Button>
		</fieldset>
	</form>
</main>
