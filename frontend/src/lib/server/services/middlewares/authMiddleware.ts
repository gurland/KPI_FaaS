import type { User } from 'lucide-svelte';
import { Metadata, type ClientMiddleware } from 'nice-grpc';

export const authMiddleware: ClientMiddleware = async function* (call, options) {
	const userMetaData = options.metadata?.get('user') ?? '{"user-id": null}';
	const user = JSON.parse(userMetaData) as User;

	return yield* call.next(call.request, {
		metadata: new Metadata({ ['user-id']: user.userId.toString() })
	});
};
