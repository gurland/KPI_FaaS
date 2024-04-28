import { Metadata } from 'nice-grpc';
import type { RequestEvent } from '@sveltejs/kit';
import { authTokenManager } from '@/auth';

export const getRpcMetaData = (event: RequestEvent) => {
	const user = authTokenManager.verifyToken(event) ?? null;
	return new Metadata({
		user: JSON.stringify(user)
	});
};
