<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { CircleAlert, LoaderCircleIcon } from 'lucide-svelte';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';
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
</script>

{#if form?.errorMessage}
	<Alert variant="destructive" class="mx-auto mb-4 min-w-full">
		<CircleAlert class="h-4 w-4" />
		<AlertTitle>Error</AlertTitle>
		<AlertDescription>{form?.errorMessage}</AlertDescription>
	</Alert>
{/if}

<Card.Root class="mx-auto min-w-full">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your username and password below</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="post" use:enhance={handleSubmit}>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input
						id="username"
						name="username"
						placeholder="MyFancyUsername"
						autocomplete="username"
						value={form?.username}
						required
					/>
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						type="password"
						name="password"
						autocomplete="current-password"
						value={form?.password}
						required
					/>
				</div>
				<Button type="submit" class="w-full" disabled={isFormLoading}>
					{#if isFormLoading}
						<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Login
				</Button>
			</div>
		</form>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="/register" class="underline"> Sign up </a>
		</div>
	</Card.Content>
</Card.Root>
