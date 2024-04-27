import { authTokenManager } from '@/auth';
import { type Actions, type RequestEvent, type ActionFailure, type Redirect } from '@sveltejs/kit';

type RegisterFormData = {
	userName: FormDataEntryValue;
	password: FormDataEntryValue;
	passwordConfirm: FormDataEntryValue;
};

export const actions: Actions = {
	default: async ({
		cookies,
		request
	}: RequestEvent): Promise<RegisterFormData | ActionFailure<RegisterFormData> | Redirect> => {
		const signupFormData = await request.formData();
		const userName = signupFormData.get('userName') ?? '';
		const password = signupFormData.get('password') ?? '';
		const passwordConfirm = signupFormData.get('passwordConfirm') ?? '';

		const registerResponse: RegisterFormData = {
			userName,
			password,
			passwordConfirm
		};

		authTokenManager.setToken(cookies, {
			userName: userName.toString(),
			userID: '123',
			role: 'admin'
		});

		return registerResponse;
	}
};
