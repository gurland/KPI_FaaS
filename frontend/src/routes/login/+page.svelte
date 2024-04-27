<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
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
				<Button type="submit" class="w-full">Login</Button>
			</div>
		</form>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="/register" class="underline"> Sign up </a>
		</div>
	</Card.Content>
</Card.Root>
