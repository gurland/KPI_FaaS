import { fail, type ActionFailure } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { authService, getRpcMetaData } from '@/server';

export const load: PageServerLoad = async (event) => {
	return {
		user: event.locals.user
	};
};

type CreateTriggerFormData = {
	errorMessage?: string;
};

export const actions: Actions = {
	changePassword: async (
		event: RequestEvent
	): Promise<CreateTriggerFormData | ActionFailure<CreateTriggerFormData>> => {
		const { request, locals } = event;
		const formData = await request.formData();
		const currentPassword = formData.get('currentPassword') ?? '';
		const newPassword = formData.get('newPassword') ?? '';
		const newPasswordConfirm = formData.get('newPasswordConfirm') ?? '';

		try {
			if (newPassword !== newPasswordConfirm) {
				return fail(400, { errorMessage: 'Passwords do not match' });
			}
			await authService.changeUserPassword(
				{
					userId: locals.user?.userId,
					oldPassword: currentPassword.toString(),
					newPassword: newPassword.toString()
				},
				{ metadata: getRpcMetaData(event) }
			);
		} catch (e) {
			if (e instanceof Error) {
				return fail(400, { errorMessage: e.message });
			}
		}

		return { errorMessage: undefined };
	}
};
