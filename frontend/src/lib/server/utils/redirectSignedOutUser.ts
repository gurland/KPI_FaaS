import { redirect, type RequestEvent } from '@sveltejs/kit';

export const redirectSignedOutUser = (event: RequestEvent) => {
	console.log('Redirecting signed out user');
	const { pathname, search } = event.url;
	const fromUrl = (pathname + search).slice(1);

	return redirect(302, `/login?redirectTo=${fromUrl}`);
};
