<script lang="ts">
	import Triangle from 'lucide-svelte/icons/triangle';
	import Bot from 'lucide-svelte/icons/bot';
	import SquareTerminal from 'lucide-svelte/icons/square-terminal';
	import CodeXML from 'lucide-svelte/icons/code-xml';
	import Settings2 from 'lucide-svelte/icons/settings-2';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import Book from 'lucide-svelte/icons/book';
	import SquareUser from 'lucide-svelte/icons/square-user';
	import Settings from 'lucide-svelte/icons/settings';
	import Rabbit from 'lucide-svelte/icons/rabbit';
	import Bird from 'lucide-svelte/icons/bird';
	import Turtle from 'lucide-svelte/icons/turtle';
	import Share from 'lucide-svelte/icons/share';
	import Paperclip from 'lucide-svelte/icons/paperclip';
	import Mic from 'lucide-svelte/icons/mic';
	import CornerDownLeft from 'lucide-svelte/icons/corner-down-left';

	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { page } from '$app/stores';
	import { ChevronLeft, CircleAlert, Container, LoaderCircleIcon } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

	let isFormLoading = false;

	const handleSubmit: SubmitFunction = ({ formData }) => {
		isFormLoading = true;

		if (formData.get('code')?.toString().trim() !== functionDetailed?.code.trim()) {
			formData.set('codeChanged', 'true');
		}

		if (formData.get('runtimeTag') !== functionDetailed?.runtimeTag) {
			formData.set('runtimeTagChanged', 'true');
		}
		return async ({ update }) => {
			isFormLoading = false;
			update();
		};
	};

	export let form: ActionData;
	export let data: PageData;

	const { briefRuntimes = [], functionDetailed } = data;
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<Button variant="outline" size="icon" class="mr-4 h-7 w-7" href="./">
		<ChevronLeft class="h-4 w-4" />
		<span class="sr-only">Back</span>
	</Button>
	<h1 class="text-xl font-semibold">Create new function</h1>
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
		action="?/updateFunction"
		use:enhance={handleSubmit}
	>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<legend class="-ml-1 px-1 text-sm font-medium"> Settings </legend>
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
			<Button type="submit" class="w-full" disabled={isFormLoading}>
				{#if isFormLoading}
					<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Update runtime
			</Button>
		</fieldset>
	</form>
</main>
