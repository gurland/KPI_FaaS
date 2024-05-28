<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { ChevronLeft, CircleAlert, LoaderCircleIcon } from 'lucide-svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
	import { RichTextEditor } from '@/components/external/rich-text-editor/';
	import type { PageData } from './$types';

	export let data: PageData;

	export let form: ActionData;

	const { detailedRuntime } = data;

	let isFormLoading = false;
	let dockerFileCode = detailedRuntime?.dockerfile ?? '';

	const handleDockerfileCodeChange = (code: string) => {
		dockerFileCode = code;
	};

	const handleSubmit: SubmitFunction = (e) => {
		isFormLoading = true;
		e.formData.set('dockerfile', dockerFileCode);
		return async ({ update }) => {
			isFormLoading = false;
			update();
		};
	};
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<Button variant="outline" size="icon" class="mr-4 h-7 w-7" href="./">
		<ChevronLeft class="h-4 w-4" />
		<span class="sr-only">Back</span>
	</Button>
	<h1 class="text-xl font-semibold">Edit runtime</h1>
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
		action="?/updateRuntime"
		use:enhance={handleSubmit}
	>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<div class="grid gap-3">
				<Label>Dockerfile</Label>
				<RichTextEditor defaultLanguage="dockerfile" onChange={handleDockerfileCodeChange} />
			</div>

			<Button type="submit" class="w-full" disabled={isFormLoading}>
				{#if isFormLoading}
					<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Update runtime
			</Button>
		</fieldset>
	</form>
</main>
