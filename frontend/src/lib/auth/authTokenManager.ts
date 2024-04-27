import jwt from 'jsonwebtoken';
import type { AuthTokenPayload } from '@/types';
import type { Cookies } from '@sveltejs/kit';

const JWT_SECRET = 'SECRET_INGREDIENT';

class AuthTokenManager {
	#authTokenCookieName = 'auth_token';
	#authTokenExpiration = 60;

	setToken(cookies: Cookies, payload: AuthTokenPayload) {
		const authToken = jwt.sign(payload, JWT_SECRET, {
			expiresIn: this.#authTokenExpiration
		});

		cookies.set(this.#authTokenCookieName, authToken, {
			path: '/',
			httpOnly: true,
			maxAge: this.#authTokenExpiration,
			sameSite: 'strict'
		});
	}

	verifyToken(cookies: Cookies) {
		const authToken = cookies.get(this.#authTokenCookieName);

		if (!authToken) {
			return undefined;
		}

		try {
			const payload = jwt.verify(authToken, JWT_SECRET) as AuthTokenPayload;
			return payload;
		} catch (error) {
			return undefined;
		}
	}
}

export const authTokenManager = new AuthTokenManager();
