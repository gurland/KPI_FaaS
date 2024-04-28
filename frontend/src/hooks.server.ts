import { authTokenManager } from '@/auth';
import {
	authService,
	getRpcMetaData,
	redirectSignedInUser,
	redirectSignedOutUser,
	runtimeService
} from '@/server';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async function ({ event, resolve }) {
	let user = authTokenManager.verifyToken(event);

	if (!user && event.route.id?.startsWith('/(protected)')) {
		return redirectSignedOutUser(event);
	}

	if (user) {
		try {
			const userVerified = await authService.verifyUser({ userId: user.userId });
			if (user.updatedAtTimestamp !== userVerified.updatedAtTimestamp) {
				user = authTokenManager.revokeToken(event);
			}
		} catch (e) {
			console.log('authService.verifyUser', e);
			user = authTokenManager.revokeToken(event);
		}
	}

	if (!user && event.route.id?.startsWith('/(protected)')) {
		return redirectSignedOutUser(event);
	}

	if (user && event.route.id?.startsWith('/(auth)')) {
		return redirectSignedInUser(event);
	}

	return resolve(event);
};
