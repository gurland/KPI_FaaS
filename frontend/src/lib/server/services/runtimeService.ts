import { RuntimeServiceDefinition, type RuntimeServiceClient } from '@/server/rpc/runtime_service';
import { createChannel, createClientFactory } from 'nice-grpc';
import { authMiddleware } from './middlewares';
import { ServiceName, getServiceAddress } from './utils';

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel(getServiceAddress(ServiceName.Runtime));

export const runtimeService: RuntimeServiceClient = clientFactory.create(
	RuntimeServiceDefinition,
	channel
);
