import {
	env
} from '$env/dynamic/private';

export enum ServiceName {
	Auth = 'auth',
	Function = 'function',
	Runtime = 'runtime',
	CrontabTrigger = 'crontabTrigger',
	ApiGatewayTrigger = 'apiGatewayTrigger'
}

const serviceURLBindings = {
	[ServiceName.Auth]: env.AUTH_SERVICE_URL,
	[ServiceName.Function]: env.FUNCTION_SERVICE_URL,
	[ServiceName.Runtime]: env.RUNTIME_SERVICE_URL,
	[ServiceName.CrontabTrigger]: env.CRONTAB_TRIGGER_SERVICE_URL,
	[ServiceName.ApiGatewayTrigger]: env.API_GATEWAY_TRIGGER_SERVICE_URL
};

export function getServiceAddress(serviceName: ServiceName): string {
	return serviceURLBindings[serviceName];
}
