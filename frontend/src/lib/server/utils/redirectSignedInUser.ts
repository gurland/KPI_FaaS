import { redirect, type RequestEvent } from '@sveltejs/kit';

export const redirectSignedInUser = (event: RequestEvent) => {
	const redirectTo = event.url.searchParams.get('redirectTo') || 'dashboard';
	return redirect(302, `/${redirectTo}`);
};