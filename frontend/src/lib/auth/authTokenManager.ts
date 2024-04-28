import jwt from 'jsonwebtoken';
import type { RequestEvent } from '@sveltejs/kit';
import type { User } from '@/server';

const JWT_SECRET = 'SECRET_INGREDIENT';

class AuthTokenManager {
	#authTokenCookieName = 'auth_token';
	#authTokenExpiration = 60 * 60 * 24 * 7;

	setToken(event: RequestEvent, payload: User) {
		const authToken = jwt.sign(payload, JWT_SECRET, {
			expiresIn: this.#authTokenExpiration
		});

		event.cookies.set(this.#authTokenCookieName, authToken, {
			path: '/',
			httpOnly: true,
			maxAge: this.#authTokenExpiration,
			sameSite: 'strict'
		});
	}

	verifyToken(event: RequestEvent) {
		const authToken = event.cookies.get(this.#authTokenCookieName);

		if (!authToken) {
			return undefined;
		}

		try {
			const payload = jwt.verify(authToken, JWT_SECRET) as User;
			return payload;
		} catch (error) {
			return undefined;
		}
	}
	revokeToken(event: RequestEvent) {
		event.cookies.set(this.#authTokenCookieName, '', {
			path: '/',
			httpOnly: true,
			maxAge: 0,
			sameSite: 'strict'
		});

		return undefined;
	}
}

export const authTokenManager = new AuthTokenManager();
