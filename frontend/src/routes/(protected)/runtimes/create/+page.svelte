<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { ChevronLeft, CircleAlert, LoaderCircleIcon } from 'lucide-svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
	import { RichTextEditor } from '@/components/external/rich-text-editor';
	import * as Select from '$lib/components/ui/select';
	import { languageOptions, languages, type Language } from '@/syntax';

	const richTextEditorHeight = 250;

	let isFormLoading = false;
	let dockerFileCode = '';
	let invokerScriptCode = '';
	let functionExampleCode = '';
	let syntax: Language = 'plaintext';

	const handleDockerfileCodeChange = (code: string) => {
		dockerFileCode = code;
	};

	const handleInvokerScriptCodeChange = (code: string) => {
		invokerScriptCode = code;
	};

	const handleFunctionExampleCodeChange = (code: string) => {
		functionExampleCode = code;
	};

	const handleSubmit: SubmitFunction = (e) => {
		isFormLoading = true;
		e.formData.set('dockerfile', dockerFileCode);
		e.formData.set('invokerScript', invokerScriptCode);
		e.formData.set('functionExample', functionExampleCode);
		e.formData.set('syntax', syntax);
		return async ({ update }) => {
			isFormLoading = false;
			update();
		};
	};

	export let form: ActionData;
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<Button variant="outline" size="icon" class="mr-4 h-7 w-7" href="./">
		<ChevronLeft class="h-4 w-4" />
		<span class="sr-only">Back</span>
	</Button>
	<h1 class="text-xl font-semibold">Create new runtime</h1>
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
		action="?/createRuntime"
		use:enhance={handleSubmit}
	>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<div class="grid gap-3">
				<Label for="tag">Tag</Label>
				<Input id="tag" name="tag" type="text" placeholder="Docker image tag" value={form?.tag} />
			</div>

			<div class="grid gap-3">
				<Label>Dockerfile</Label>
				<RichTextEditor
					height={richTextEditorHeight}
					defaultLanguage="dockerfile"
					onChange={handleDockerfileCodeChange}
				/>
			</div>

			<div>
				<Select.Root
					portal={null}
					name="syntax"
					selected={{
						value: syntax,
						label: languages[syntax]
					}}
					onSelectedChange={(e) => {
						if (typeof e?.value === 'string') {
							syntax = e.value;
						}
					}}
				>
					<Select.Trigger id="syntax">
						<Select.Value placeholder="Syntax" />
					</Select.Trigger>
					<Select.Content>
						{#each languageOptions as languageOption}
							<Select.Item value={languageOption.value} label={languageOption.label} />
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<div class="grid gap-3">
				<Label>Invoker script</Label>
				<RichTextEditor
					height={richTextEditorHeight}
					defaultLanguage={syntax}
					onChange={handleInvokerScriptCodeChange}
				/>
			</div>
			<div class="grid gap-3">
				<Label>Function example</Label>
				<RichTextEditor
					height={richTextEditorHeight}
					defaultLanguage={syntax}
					onChange={handleFunctionExampleCodeChange}
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
