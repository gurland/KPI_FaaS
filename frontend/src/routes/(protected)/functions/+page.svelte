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

	const { briefFunctions } = data;
</script>

<header
	class="sticky top-0 z-10 flex h-[57px] items-center justify-between gap-1 border-b bg-background px-4"
>
	<h1 class="text-xl font-semibold">Functions</h1>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<Button
				variant="ghost"
				size="icon"
				class="rounded-lg"
				aria-label="Create new function"
				builders={[builder]}
				href="/functions/create"
			>
				<PlusIcon class="size-5" />
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content side="right" sideOffset={5}>Create new function</Tooltip.Content>
	</Tooltip.Root>
</header>
<main class="mx-auto grid w-full max-w-xl grid-cols-1 gap-4 overflow-auto p-4">
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead>Id</TableHead>
				<TableHead>Name</TableHead>
				<TableHead>Runtime</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each briefFunctions as briefFunction, i (i)}
				<TableRow
					on:click={() => {
						goto(`/functions/${briefFunction.functionId}`);
					}}
				>
					<TableCell>{briefFunction.functionId}</TableCell>
					<TableCell>{briefFunction.functionName}</TableCell>
					<TableCell>{briefFunction.runtimeTag}</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</main>
