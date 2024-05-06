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
	import { CircleAlert, Container, LoaderCircleIcon, PlusIcon } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
	import {
		Table,
		TableCaption,
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
				aria-label="Functions"
				builders={[builder]}
				href="/dashboard/functions/create"
			>
				<PlusIcon class="size-5" />
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content side="right" sideOffset={5}>Create new function</Tooltip.Content>
	</Tooltip.Root>
</header>
<main class="mx-auto grid w-full max-w-lg grid-cols-1 gap-4 overflow-auto p-4">
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
						goto(`/dashboard/functions/${briefFunction.functionId}`);
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
