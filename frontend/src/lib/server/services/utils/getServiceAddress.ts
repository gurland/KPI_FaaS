import {
	SERVICE_IP,
	AUTH_SERVICE_PORT,
	FUNCTION_SERVICE_PORT,
	RUNTIME_SERVICE_PORT,
	CRONTAB_TRIGGER_SERVICE_PORT,
	API_GATEWAY_TRIGGER_SERVICE_PORT
} from '$env/static/private';

export enum ServiceName {
	Auth = 'auth',
	Function = 'function',
	Runtime = 'runtime',
	CrontabTrigger = 'crontabTrigger',
	ApiGatewayTrigger = 'apiGatewayTrigger'
}

const portBindings = {
	[ServiceName.Auth]: AUTH_SERVICE_PORT,
	[ServiceName.Function]: FUNCTION_SERVICE_PORT,
	[ServiceName.Runtime]: RUNTIME_SERVICE_PORT,
	[ServiceName.CrontabTrigger]: CRONTAB_TRIGGER_SERVICE_PORT,
	[ServiceName.ApiGatewayTrigger]: API_GATEWAY_TRIGGER_SERVICE_PORT
};

export function getServiceAddress(serviceName: ServiceName): string {
	return `${SERVICE_IP}:${portBindings[serviceName]}`;
}
