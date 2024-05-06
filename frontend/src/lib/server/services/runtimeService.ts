import { RuntimeServiceDefinition, type RuntimeServiceClient } from '@/server/rpc/runtime_service';
import { createChannel, createClientFactory } from 'nice-grpc';
import { authMiddleware } from './middlewares';

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel('192.168.1.218:50061');

export const runtimeService: RuntimeServiceClient = clientFactory.create(
	RuntimeServiceDefinition,
	channel
);
