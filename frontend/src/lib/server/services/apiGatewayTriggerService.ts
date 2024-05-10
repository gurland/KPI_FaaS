import {
	APIGatewayServiceDefinition,
	type APIGatewayServiceClient
} from '@/server/rpc/api_gateway_trigger_service';
import { createChannel, createClientFactory } from 'nice-grpc';
import { authMiddleware } from './middlewares';
import { ServiceName, getServiceAddress } from './utils';

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel(getServiceAddress(ServiceName.ApiGatewayTrigger));

export const apiGatewayTriggerService: APIGatewayServiceClient = clientFactory.create(
	APIGatewayServiceDefinition,
	channel
);
