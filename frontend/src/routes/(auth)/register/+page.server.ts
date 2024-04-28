import { authTokenManager } from '@/auth';
import { User, redirectSignedInUser } from '@/server';
import { authService } from '@/server/services';
import {
	type Actions,
	type RequestEvent,
	type ActionFailure,
	type Redirect,
	fail
} from '@sveltejs/kit';
import { ClientError } from 'nice-grpc';

type RegisterFormData = {
	username: FormDataEntryValue;
	password: FormDataEntryValue;
	passwordConfirm: FormDataEntryValue;
	errorMessage?: string;
};

export const actions: Actions = {
	default: async (
		event: RequestEvent
	): Promise<RegisterFormData | ActionFailure<RegisterFormData> | Redirect> => {
		const { cookies, request } = event;
		const signupFormData = await request.formData();
		const username = signupFormData.get('username') ?? '';
		const password = signupFormData.get('password') ?? '';
		const passwordConfirm = signupFormData.get('passwordConfirm') ?? '';

		const registerResponse: RegisterFormData = {
			username,
			password,
			passwordConfirm
		};

		let user: User | undefined;

		try {
			user = await authService.createUser({
				username: username.toString(),
				password: password.toString()
			});

			authTokenManager.setToken(cookies, user);
		} catch (e) {
			if (e instanceof ClientError) {
				return fail(400, { ...registerResponse, errorMessage: e.message });
			}
		}

		if (user) {
			return redirectSignedInUser(event);
		}

		return registerResponse;
	}
};
