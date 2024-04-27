<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="post" use:enhance>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="userName">userName</Label>
					<Input id="userName" name="userName" placeholder="JuniorDev" required />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" name="password" required />
				</div>
				<div class="grid gap-2">
					<Label for="passwordConfirm">Re-enter password</Label>
					<Input id="passwordConfirm" type="password" name="passwordConfirm" required />
				</div>
				<Button type="submit" class="w-full">Create an account</Button>
			</div>
		</form>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline"> Sign in </a>
		</div>
	</Card.Content>
</Card.Root>
