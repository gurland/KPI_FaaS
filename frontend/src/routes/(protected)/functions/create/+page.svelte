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

	const { briefRuntimes } = data;
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<Button variant="outline" size="icon" class="mr-4 h-7 w-7" href="./">
		<ChevronLeft class="h-4 w-4" />
		<span class="sr-only">Back</span>
	</Button>
	<h1 class="text-xl font-semibold">Create new function</h1>
</header>

<main class="mx-auto grid w-full max-w-xl grid-cols-1 gap-4 overflow-auto p-4">
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
				<Select.Root portal={null} name="runtimeTag">
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
					<Select.Input value={form?.runtimeTag?.toString()} />
				</Select.Root>
			</div>
			<div class="grid gap-3">
				<Label for="code">Code</Label>
				<Textarea
					id="code"
					name="code"
					placeholder="Function code goes here"
					class="min-h-[9.5rem]"
					value={form?.code?.toString()}
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
