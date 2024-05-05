import { RuntimeServiceDefinition, type RuntimeServiceClient } from '@/server/rpc/runtime_service';

import { Metadata, createChannel, createClientFactory, type ClientMiddleware } from 'nice-grpc';
import type { User } from '../rpc/auth_service';

const authMiddleware: ClientMiddleware = async function* (call, options) {
	const userMetaData = options.metadata?.get('user') ?? '{"user-id": null}';
	const user = JSON.parse(userMetaData) as User;

	return yield* call.next(call.request, {
		metadata: new Metadata({ ['user-id']: user.userId.toString() })
	});
};

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel('192.168.1.218:50061');

export const runtimeService: RuntimeServiceClient = clientFactory.create(
	RuntimeServiceDefinition,
	channel
);
