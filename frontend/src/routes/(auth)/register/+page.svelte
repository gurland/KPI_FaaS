<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { CircleAlert, LoaderCircleIcon } from 'lucide-svelte';

	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types';
	import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
		<Card.Title class="text-xl">Sign Up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="post" use:enhance={handleSubmit}>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input
						id="username"
						name="username"
						placeholder="Username"
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
						placeholder="Password"
						autocomplete="new-password"
						value={form?.password}
						required
					/>
				</div>
				<div class="grid gap-2">
					<Label for="passwordConfirm">Re-enter password</Label>
					<Input
						id="passwordConfirm"
						type="password"
						name="passwordConfirm"
						placeholder="Re-enter password"
						autocomplete="new-password"
						value={form?.passwordConfirm}
						required
					/>
				</div>
				<Button type="submit" class="w-full" disabled={isFormLoading}>
					{#if isFormLoading}
						<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Create an account
				</Button>
			</div>
		</form>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline"> Sign in </a>
		</div>
	</Card.Content>
</Card.Root>
