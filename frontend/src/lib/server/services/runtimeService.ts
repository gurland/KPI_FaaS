import { RuntimeServiceDefinition, type RuntimeServiceClient } from '@/server/rpc/runtime_service';

import { Metadata, createChannel, createClientFactory, type ClientMiddleware } from 'nice-grpc';
import type { User } from '../rpc/auth_service';
import { authService } from './authService';
import { UnauthorizedError } from '../errors';

const authMiddleware: ClientMiddleware = async function* (call, options) {
	const userMetaData = options.metadata?.get('user') ?? '{"user-id": null}';
	const user = JSON.parse(userMetaData) as User;

	console.log('authMiddleware', user);
	return yield* call.next(call.request, {
		metadata: new Metadata({ ['user-id']: user.userId.toString() })
	});
	/* if (!userMetaData) {
		throw new UnauthorizedError();
	}

	try {
		const user = JSON.parse(userMetaData) as User;
		const userVerified = await authService.verifyUser({ userId: user.userId });

		if (user.updatedAtTimestamp === userVerified.updatedAtTimestamp) {
			return yield* call.next(call.request, {
				metadata: new Metadata({ user: JSON.stringify({ userId: userVerified.userId }) })
			});
		} else {
			throw new UnauthorizedError();
		}
	} catch (e) {
		console.log('runtimeservice', e);
		throw new UnauthorizedError();
	} */
};

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel('192.168.1.219:50061');

export const runtimeService: RuntimeServiceClient = clientFactory.create(
	RuntimeServiceDefinition,
	channel
);
