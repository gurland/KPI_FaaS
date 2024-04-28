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
	import { Container, LoaderCircleIcon } from 'lucide-svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let isFormLoading = false;

	const handleSubmit: SubmitFunction = () => {
		isFormLoading = true;
		return async ({ update }) => {
			isFormLoading = false;
			update();
		};
	};

	export let formData: ActionData;
</script>

<div class="grid h-screen w-full pl-[53px]">
	<aside class="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
		<div class="border-b p-2">
			<Button variant="outline" size="icon" aria-label="Home">
				<Triangle class="size-5 fill-foreground" />
			</Button>
		</div>
		<nav class="grid gap-1 p-2">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						variant="ghost"
						size="icon"
						class="rounded-lg bg-muted"
						aria-label="Runtimes"
						builders={[builder]}
					>
						<Container class="size-5" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="right" sideOffset={5}>Runtimes</Tooltip.Content>
			</Tooltip.Root>
		</nav>
		<nav class="mt-auto grid gap-1 p-2">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						variant="ghost"
						size="icon"
						class="mt-auto rounded-lg"
						aria-label="Help"
						builders={[builder]}
					>
						<LifeBuoy class="size-5" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="right" sideOffset={5}>Help</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						variant="ghost"
						size="icon"
						class="mt-auto rounded-lg"
						aria-label="Account"
						builders={[builder]}
					>
						<SquareUser class="size-5" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="right" sideOffset={5}
					>Account ({$page.data.user?.username})</Tooltip.Content
				>
			</Tooltip.Root>
		</nav>
	</aside>
	<div class="flex flex-col">
		<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
			<h1 class="text-xl font-semibold">Playground</h1>
		</header>
		<main class="mx-auto grid w-full max-w-lg grid-cols-1 gap-4 overflow-auto p-4">
			<form
				class="m-auto grid min-w-full items-center gap-6"
				method="post"
				action="?/createRuntime"
				use:enhance
			>
				<fieldset class="grid gap-6 rounded-lg border p-4">
					<legend class="-ml-1 px-1 text-sm font-medium"> Settings </legend>
					<div class="grid gap-3">
						<Label for="tag">Tag</Label>
						<Input
							id="tag"
							name="tag"
							type="text"
							placeholder="Docker image tag"
							value={formData?.tag}
						/>
					</div>

					<div class="grid gap-3">
						<Label for="dockerfile">Dockerfile</Label>
						<Textarea
							id="dockerfile"
							name="dockerfile"
							placeholder="Dockerfile content here"
							class="min-h-[9.5rem]"
							value={formData?.dockerfile?.toString()}
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
	</div>
</div>
