import jwt from 'jsonwebtoken';
import type { RequestEvent } from '@sveltejs/kit';
import { authService, type User, type UserCredentialsRequest } from '@/server';

const JWT_SECRET = 'SECRET_INGREDIENT';

class AuthTokenManager {
	#authTokenCookieName = 'auth_token';
	#authTokenExpiration = 60 * 60 * 24 * 7;

	async registerUser(event: RequestEvent, request: UserCredentialsRequest) {
		const user = await authService.createUser(request);

		this.#setToken(event, user);
	}

	async loginUser(event: RequestEvent, request: UserCredentialsRequest) {
		const user = await authService.getUser(request);

		this.#setToken(event, user);
	}

	async verifyUser(event: RequestEvent) {
		const authToken = event.cookies.get(this.#authTokenCookieName);

		if (!authToken) {
			return false;
		}

		try {
			const user = jwt.verify(authToken, JWT_SECRET) as User;
			const userVerified = await authService.verifyUser({ userId: user.userId });

			if (user.updatedAtTimestamp !== userVerified.updatedAtTimestamp) {
				throw new Error('Token is outdated');
			}
			event.locals.user = userVerified;
		} catch (error) {
			this.#revokeToken(event);
			return false;
		}

		return true;
	}

	getUserFromToken(event: RequestEvent) {
		const authToken = event.cookies.get(this.#authTokenCookieName);

		if (!authToken) {
			return undefined;
		}

		try {
			const user = jwt.verify(authToken, JWT_SECRET) as User;
			return user;
		} catch (error) {
			return undefined;
		}
	}

	#setToken(event: RequestEvent, payload: User) {
		const authToken = jwt.sign(payload, JWT_SECRET, {
			expiresIn: this.#authTokenExpiration
		});

		event.cookies.set(this.#authTokenCookieName, authToken, {
			path: '/',
			httpOnly: true,
			maxAge: this.#authTokenExpiration,
			sameSite: 'strict'
		});
		event.locals.user = payload;
	}

	#revokeToken(event: RequestEvent) {
		event.cookies.set(this.#authTokenCookieName, '', {
			path: '/',
			httpOnly: true,
			maxAge: 0,
			sameSite: 'strict'
		});
		event.locals.user = undefined;
	}
}

export const authTokenManager = new AuthTokenManager();
