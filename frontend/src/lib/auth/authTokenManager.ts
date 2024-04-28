import jwt from 'jsonwebtoken';
import type { Cookies } from '@sveltejs/kit';
import type { User } from '@/server';

const JWT_SECRET = 'SECRET_INGREDIENT';

class AuthTokenManager {
	#authTokenCookieName = 'auth_token';
	#authTokenExpiration = 60 * 60 * 24 * 7;

	setToken(cookies: Cookies, payload: User) {
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
			const payload = jwt.verify(authToken, JWT_SECRET) as User;
			return payload;
		} catch (error) {
			return undefined;
		}
	}
}

export const authTokenManager = new AuthTokenManager();
