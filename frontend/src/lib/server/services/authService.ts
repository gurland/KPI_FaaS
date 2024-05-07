import { AuthServiceDefinition, type AuthServiceClient } from '@/server/rpc/auth_service';

import { createChannel, createClient } from 'nice-grpc';
import { ServiceName, getServiceAddress } from './utils';

const channel = createChannel(getServiceAddress(ServiceName.Auth));

export const authService: AuthServiceClient = createClient(AuthServiceDefinition, channel);
