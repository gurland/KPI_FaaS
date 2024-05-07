import {
	FunctionServiceDefinition,
	type FunctionServiceClient
} from '@/server/rpc/function_service';
import { createChannel, createClientFactory } from 'nice-grpc';
import { authMiddleware } from './middlewares';
import { ServiceName, getServiceAddress } from './utils';

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel(getServiceAddress(ServiceName.Function));

export const functionService: FunctionServiceClient = clientFactory.create(
	FunctionServiceDefinition,
	channel
);
