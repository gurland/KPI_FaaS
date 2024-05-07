import {
	CrontabTriggerServiceDefinition,
	type CrontabTriggerServiceClient
} from '@/server/rpc/crontab_trigger_service';
import { createChannel, createClientFactory } from 'nice-grpc';
import { authMiddleware } from './middlewares';
import { ServiceName, getServiceAddress } from './utils';

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel(getServiceAddress(ServiceName.Trigger));

export const triggerService: CrontabTriggerServiceClient = clientFactory.create(
	CrontabTriggerServiceDefinition,
	channel
);
