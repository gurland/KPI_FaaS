import {
	SERVICE_IP,
	AUTH_SERVICE_PORT,
	FUNCTION_SERVICE_PORT,
	RUNTIME_SERVICE_PORT,
	TRIGGER_SERVICE_PORT
} from '$env/static/private';

export enum ServiceName {
	Auth = 'auth',
	Function = 'function',
	Runtime = 'runtime',
	Trigger = 'trigger'
}

const portBindings = {
	[ServiceName.Auth]: AUTH_SERVICE_PORT,
	[ServiceName.Function]: FUNCTION_SERVICE_PORT,
	[ServiceName.Runtime]: RUNTIME_SERVICE_PORT,
	[ServiceName.Trigger]: TRIGGER_SERVICE_PORT
};

export function getServiceAddress(serviceName: ServiceName): string {
	return `${SERVICE_IP}:${portBindings[serviceName]}`;
}
