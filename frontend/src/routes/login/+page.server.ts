import { authTokenManager } from '@/auth';
import { type Actions, type RequestEvent, type ActionFailure, type Redirect } from '@sveltejs/kit';

type LoginFormData = {
	userName: FormDataEntryValue;
	password: FormDataEntryValue;
};

export const actions: Actions = {
	default: async ({
		cookies,
		request
	}: RequestEvent): Promise<LoginFormData | ActionFailure<LoginFormData> | Redirect> => {
		const loginFormData = await request.formData();
		const userName = loginFormData.get('userName') ?? '';
		const password = loginFormData.get('password') ?? '';

		const loginResponse: LoginFormData = {
			userName,
			password
		};

		authTokenManager.setToken(cookies, {
			userName: userName.toString(),
			userID: '123',
			role: 'admin'
		});

		return loginResponse;
	}
};
