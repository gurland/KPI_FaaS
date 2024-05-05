// See https://kit.svelte.dev/docs/types#app

import type { User } from '@/server';
import type { BriefRuntime } from '@/server/rpc/runtime_service';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: User;
		}
		interface PageData {
			user?: User;
			runtimes?: BriefRuntime[];
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
