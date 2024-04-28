import { AuthServiceDefinition, type AuthServiceClient } from '@/server/rpc/auth_service';

import { createChannel, createClient } from 'nice-grpc';

const channel = createChannel('192.168.1.219:50051');

export const authService: AuthServiceClient = createClient(AuthServiceDefinition, channel);
