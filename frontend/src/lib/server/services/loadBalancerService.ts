import {
	LoadBalancerServiceDefinition,
	type LoadBalancerServiceClient
} from '@/server/rpc/load_balancer_service';
import { createChannel, createClientFactory } from 'nice-grpc';
import { authMiddleware } from './middlewares';
import { ServiceName, getServiceAddress } from './utils';

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel(getServiceAddress(ServiceName.LoadBalancer));

export const loadBalancerService: LoadBalancerServiceClient = clientFactory.create(
	LoadBalancerServiceDefinition,
	channel
);
