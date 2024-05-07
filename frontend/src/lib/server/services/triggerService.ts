import {
	CrontabTriggerServiceDefinition,
	type CrontabTriggerServiceClient
} from '@/server/rpc/crontab_trigger_service';
import { createChannel, createClientFactory } from 'nice-grpc';
import { authMiddleware } from './middlewares';

const clientFactory = createClientFactory().use(authMiddleware);

const channel = createChannel('192.168.1.218:50081');

export const triggerService: CrontabTriggerServiceClient = clientFactory.create(
	CrontabTriggerServiceDefinition,
	channel
);
