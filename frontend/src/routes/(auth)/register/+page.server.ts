import { authTokenManager } from '@/auth';
import { redirectSignedInUser } from '@/server';
import {
	type Actions,
	type RequestEvent,
	type ActionFailure,
	type Redirect,
	fail
} from '@sveltejs/kit';

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
		const { request } = event;
		const signupFormData = await request.formData();
		const username = signupFormData.get('username') ?? '';
		const password = signupFormData.get('password') ?? '';
		const passwordConfirm = signupFormData.get('passwordConfirm') ?? '';

		const registerResponse: RegisterFormData = {
			username,
			password,
			passwordConfirm
		};

		try {
			await authTokenManager.registerUser(event, {
				username: username.toString(),
				password: password.toString()
			});
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { ...registerResponse, errorMessage: e.message });
			}
		}

		if (event.locals.user) {
			return redirectSignedInUser(event);
		}

		return registerResponse;
	}
};
