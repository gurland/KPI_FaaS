import { authTokenManager } from '@/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async function ({ event, resolve }) {
	const path = event.url.pathname;
	const auth = authTokenManager.verifyToken(event.cookies);
	event.locals.auth = auth;

	if (!auth && path.startsWith('/dashboard')) {
		throw redirect(302, '/login');
	}

	if (auth && (path.startsWith('/register') || path.startsWith('/login'))) {
		throw redirect(302, '/dashboard');
	}

	console.log(event.locals);
	return resolve(event);
};
