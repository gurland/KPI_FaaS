<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { PlusIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import {
		Table,
		TableHeader,
		TableHead,
		TableBody,
		TableRow,
		TableCell
	} from '@/components/ui/table';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: runtimes = data.runtimes;
</script>

<header
	class="sticky top-0 z-10 flex h-[57px] items-center justify-between gap-1 border-b bg-background px-4"
>
	<h1 class="text-xl font-semibold">Runtimes</h1>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<Button
				variant="ghost"
				size="icon"
				class="rounded-lg"
				aria-label="Create new runtime"
				builders={[builder]}
				href="/runtimes/create"
			>
				<PlusIcon class="size-5" />
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content side="right" sideOffset={5}>Create new runtime</Tooltip.Content>
	</Tooltip.Root>
</header>
<main class="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 overflow-auto p-4">
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead>Tag</TableHead>
				<TableHead>Registry url</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each runtimes as runtime, i (i)}
				<TableRow
					on:click={() => {
						goto(`/runtimes/${runtime.tag}`);
					}}
				>
					<TableCell>{runtime.tag}</TableCell>
					<TableCell>{runtime.registryUrl}</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</main>
