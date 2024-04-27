// See https://kit.svelte.dev/docs/types#app

import type { AuthTokenPayload } from '@/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth?: AuthTokenPayload;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
