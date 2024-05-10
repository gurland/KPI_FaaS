<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { CircleAlert, LoaderCircleIcon } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
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
	export let data: PageData;

	const { user } = data;
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<h1 class="text-xl font-semibold">Account</h1>
</header>

<main class="mx-auto grid w-full max-w-xl grid-cols-1 gap-4 overflow-auto p-4">
	{#if form?.errorMessage}
		<Alert variant="destructive" class="mx-auto mb-4 min-w-full">
			<CircleAlert class="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{form?.errorMessage}</AlertDescription>
		</Alert>
	{/if}

	<form method="post" action="?/changePassword" use:enhance={handleSubmit}>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input
						id="username"
						name="username"
						placeholder="Username"
						autocomplete="username"
						value={user?.username}
						readonly
						disabled
					/>
				</div>
				<div class="grid gap-2">
					<Label for="currentPassword">Current password</Label>
					<Input
						id="currentPassword"
						type="password"
						name="currentPassword"
						placeholder="Current password"
						required
					/>
				</div>
				<div class="grid gap-2">
					<Label for="newPassword">New password</Label>
					<Input
						id="newPassword"
						type="password"
						name="newPassword"
						placeholder="New password"
						autocomplete="new-password"
						required
					/>
				</div>
				<div class="grid gap-2">
					<Label for="newPasswordConfirm">Re-enter new password</Label>
					<Input
						id="newPasswordConfirm"
						type="password"
						name="newPasswordConfirm"
						placeholder="Re-enter new password"
						autocomplete="new-password"
						required
					/>
				</div>
				<Button type="submit" class="w-full" disabled={isFormLoading}>
					{#if isFormLoading}
						<LoaderCircleIcon class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Update
				</Button>
			</div>
		</fieldset>
	</form>
</main>
