import { RuntimeServiceDefinition, type RuntimeServiceClient } from '@/server/rpc/runtime_service';

import { createChannel, createClient } from 'nice-grpc';

const channel = createChannel('192.168.1.219:50051');

export const runtimeService: RuntimeServiceClient = createClient(RuntimeServiceDefinition, channel);
