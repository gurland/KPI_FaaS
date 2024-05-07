<script lang="ts">
	import Triangle from 'lucide-svelte/icons/triangle';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import SquareUser from 'lucide-svelte/icons/square-user';

	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { ContainerIcon, FunctionSquareIcon, ZapIcon } from 'lucide-svelte';
	import { page } from '$app/stores';

	$: isDashboardPath = $page.url.pathname === '/dashboard';
	$: isFunctionsPath = $page.url.pathname.startsWith('/dashboard/functions');
	$: isTriggerPath = $page.url.pathname.startsWith('/dashboard/triggers');
	$: isRuntimesPath = $page.url.pathname.startsWith('/dashboard/runtimes');
</script>

<div class="grid h-screen w-full pl-[53px]">
	<aside class="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
		<div class="border-b p-2">
			<Button
				variant="outline"
				size="icon"
				aria-label="Home"
				class={`${isDashboardPath ? 'bg-muted' : ''}`}
				href="/dashboard"
			>
				<Triangle class="size-5 fill-foreground" />
			</Button>
		</div>
		<nav class="grid gap-1 p-2">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						variant="ghost"
						size="icon"
						class={`rounded-lg ${isFunctionsPath ? 'bg-muted' : ''}`}
						aria-label="Functions"
						builders={[builder]}
						href="/dashboard/functions"
					>
						<FunctionSquareIcon class="size-5" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="right" sideOffset={5}>Functions</Tooltip.Content>
			</Tooltip.Root>
		</nav>

		<nav class="grid gap-1 p-2">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						variant="ghost"
						size="icon"
						class={`rounded-lg ${isTriggerPath ? 'bg-muted' : ''}`}
						aria-label="Triggers"
						builders={[builder]}
						href="/dashboard/triggers"
					>
						<ZapIcon class="size-5" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="right" sideOffset={5}>Triggers</Tooltip.Content>
			</Tooltip.Root>
		</nav>

		<nav class="grid gap-1 p-2">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button
						variant="ghost"
						size="icon"
						class={`rounded-lg ${isRuntimesPath ? 'bg-muted' : ''}`}
						aria-label="Runtimes"
						builders={[builder]}
						href="/dashboard/runtimes"
					>
						<ContainerIcon class="size-5" />
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
		<slot></slot>
	</div>
</div>
