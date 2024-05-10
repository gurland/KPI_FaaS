<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<h1 class="text-xl font-semibold">Dashboard</h1>
</header>
<main class="mx-auto grid w-full max-w-xl grid-cols-1 gap-4 overflow-auto p-4">
	<Card.Root>
		<Card.Header class="pb-3">
			<Card.Title>Functions</Card.Title>
			<Card.Description class="max-w-xl text-balance leading-relaxed">
				Functions are reusable blocks of code that can be triggered by events.
			</Card.Description>
		</Card.Header>
		<Card.Footer>
			<Button href="/functions/create">Create new function</Button>
		</Card.Footer>
	</Card.Root>
	<Card.Root>
		<Card.Header class="pb-3">
			<Card.Title>Triggers</Card.Title>
			<Card.Description class="max-w-xl text-balance leading-relaxed">
				Triggers are events that can be used to start a function.
			</Card.Description>
		</Card.Header>
		<Card.Footer>
			<Button href="/triggers/create">Create new trigger</Button>
		</Card.Footer>
	</Card.Root>

	<Card.Root>
		<Card.Header class="pb-3">
			<Card.Title>Runtimes</Card.Title>
			<Card.Description class="max-w-xl text-balance leading-relaxed">
				Runtimes are environments where functions are executed.
			</Card.Description>
		</Card.Header>
		<Card.Footer>
			<Button href="/runtimes/create">Create new runtime</Button>
		</Card.Footer>
	</Card.Root>
</main>
