import {
	FunctionServiceDefinition,
	type FunctionServiceClient
} from '@/server/rpc/function_service';
import { createChannel, createClientFactory } from 'nice-grpc';
import { authMiddleware } from './middlewares';

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel('192.168.1.218:50071');

export const functionService: FunctionServiceClient = clientFactory.create(
	FunctionServiceDefinition,
	channel
);
