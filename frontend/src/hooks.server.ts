import { authTokenManager } from '@/auth';
import { redirectSignedInUser, redirectSignedOutUser } from '@/server';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async function ({ event, resolve }) {
	const user = authTokenManager.verifyToken(event.cookies);
	event.locals.user = user;

	if (!user && event.route.id?.startsWith('/(protected)')) {
		return redirectSignedOutUser(event);
	}

	if (user && event.route.id?.startsWith('/(auth)')) {
		return redirectSignedInUser(event);
	}

	return resolve(event);
};
