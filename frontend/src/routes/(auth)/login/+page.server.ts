import { authTokenManager } from '@/auth';
import { redirectSignedInUser } from '@/server';
import {
	type Actions,
	type RequestEvent,
	type ActionFailure,
	type Redirect,
	fail
} from '@sveltejs/kit';

type LoginFormData = {
	username: FormDataEntryValue;
	password: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	default: async (
		event: RequestEvent
	): Promise<LoginFormData | ActionFailure<LoginFormData> | Redirect> => {
		const { request } = event;
		const loginFormData = await request.formData();
		const username = loginFormData.get('username') ?? '';
		const password = loginFormData.get('password') ?? '';

		const loginResponse: LoginFormData = {
			username,
			password
		};

		try {
			await authTokenManager.loginUser(event, {
				username: username.toString(),
				password: password.toString()
			});
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { ...loginResponse, errorMessage: e.message });
			}
		}

		if (event.locals.user) {
			return redirectSignedInUser(event);
		}

		return loginResponse;
	}
};
