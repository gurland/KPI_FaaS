<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { LoaderCircleIcon } from 'lucide-svelte';

	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types';

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

<Card.Root class="mx-auto max-w-sm">
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
						placeholder="JuniorDev"
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
		{#if form?.errorMessage}
			<p>
				{form?.errorMessage}
			</p>
		{/if}
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline"> Sign in </a>
		</div>
	</Card.Content>
</Card.Root>
