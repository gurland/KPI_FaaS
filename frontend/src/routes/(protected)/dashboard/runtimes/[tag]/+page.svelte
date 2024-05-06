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
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
	import type { PageData } from './$types';

	let isFormLoading = false;

	const handleSubmit: SubmitFunction = () => {
		isFormLoading = true;
		return async ({ update }) => {
			isFormLoading = false;
			update();
		};
	};
	export let data: PageData;

	export let form: ActionData;

	const { detailedRuntime } = data;
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<Button variant="outline" size="icon" class="mr-4 h-7 w-7" href="./">
		<ChevronLeft class="h-4 w-4" />
		<span class="sr-only">Back</span>
	</Button>
	<h1 class="text-xl font-semibold">Edit runtime</h1>
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
		action="?/updateRuntime"
		use:enhance={handleSubmit}
	>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<legend class="-ml-1 px-1 text-sm font-medium"> Settings </legend>

			<div class="grid gap-3">
				<Label for="dockerfile">Dockerfile</Label>
				<Textarea
					id="dockerfile"
					name="dockerfile"
					placeholder="Dockerfile content here"
					class="min-h-[9.5rem]"
					value={(form?.dockerfile ?? detailedRuntime?.dockerfile ?? '').toString()}
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
