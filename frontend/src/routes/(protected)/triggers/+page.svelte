<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { CircleAlert, PlusIcon, TrashIcon } from 'lucide-svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';
	import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
	import { Alert } from '@/components/ui/alert';
	import AlertTitle from '@/components/ui/alert/alert-title.svelte';
	import AlertDescription from '@/components/ui/alert/alert-description.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	const { apiGatewayTriggers, crontabTriggers } = data;

	const handleSubmit: SubmitFunction = ({ formData }) => {
		return async ({ update }) => {
			update();
		};
	};
</script>

<header
	class="sticky top-0 z-10 flex h-[57px] items-center justify-between gap-1 border-b bg-background px-4"
>
	<h1 class="text-xl font-semibold">Triggers</h1>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<Button
				variant="ghost"
				size="icon"
				class="rounded-lg"
				aria-label="Create new trigger"
				builders={[builder]}
				href="/triggers/create"
			>
				<PlusIcon class="size-5" />
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content side="right" sideOffset={5}>Create new trigger</Tooltip.Content>
	</Tooltip.Root>
</header>
<main class="mx-auto grid w-full max-w-xl grid-cols-1 gap-4 overflow-auto p-4">
	{#if form?.errorMessage}
		<Alert variant="destructive" class="mx-auto mb-4 min-w-full">
			<CircleAlert class="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{form?.errorMessage}</AlertDescription>
		</Alert>
	{/if}
	<form method="post" use:enhance={handleSubmit}>
		<Table>
			<TableBody>
				{#each apiGatewayTriggers as apiGatewayTrigger, i (i)}
					<TableRow>
						<TableCell>HTTP</TableCell>
						<TableCell>{apiGatewayTrigger.name}</TableCell>
						<TableCell>{apiGatewayTrigger.url}</TableCell>
						<TableCell>
							<Button
								formaction={`?/deleteHTTPTrigger&triggerId=${apiGatewayTrigger.triggerId}`}
								type="submit"
								variant="destructive"
								size="icon"
							>
								<TrashIcon />
							</Button>
						</TableCell>
					</TableRow>
				{/each}
				{#each crontabTriggers as crontabTrigger, i (i)}
					<TableRow>
						<TableCell>Cron</TableCell>
						<TableCell>{crontabTrigger.description}</TableCell>
						<TableCell>{crontabTrigger.cronExpression}</TableCell>
						<TableCell>
							<Button
								formaction={`?/deleteCronTrigger&triggerId=${crontabTrigger.triggerId}`}
								type="submit"
								variant="destructive"
								size="icon"
							>
								<TrashIcon />
							</Button>
						</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</form>
</main>
