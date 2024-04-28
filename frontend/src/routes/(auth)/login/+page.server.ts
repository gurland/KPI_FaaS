import { authTokenManager } from '@/auth';
import { User, authService, redirectSignedInUser } from '@/server';
import {
	type Actions,
	type RequestEvent,
	type ActionFailure,
	type Redirect,
	fail
} from '@sveltejs/kit';
import { ClientError } from 'nice-grpc';

type LoginFormData = {
	username: FormDataEntryValue;
	password: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	default: async (
		event: RequestEvent
	): Promise<LoginFormData | ActionFailure<LoginFormData> | Redirect> => {
		const { cookies, request } = event;
		const loginFormData = await request.formData();
		const username = loginFormData.get('username') ?? '';
		const password = loginFormData.get('password') ?? '';

		const loginResponse: LoginFormData = {
			username,
			password
		};

		let user: User | undefined;

		try {
			user = await authService.getUser({
				username: username.toString(),
				password: password.toString()
			});

			authTokenManager.setToken(cookies, user);
		} catch (e) {
			if (e instanceof ClientError) {
				return fail(400, { ...loginResponse, errorMessage: e.message });
			}
		}

		if (user) {
			redirectSignedInUser(event);
		}

		return loginResponse;
	}
};
