import { User } from '../repositories/entities/user.entity';
import { UserService } from './user.service';
import { AuthUserEntry, AuthUser } from '../types';
import * as utils from '../lib/utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../lib/config';

export class AuthService {
	/**
	 * processAuth function
	 * @param body
	 * @param userServices
	 * @returns
	 */
	public async processAuth(body: object, userServices: UserService): Promise<AuthUser | null> {
		const user = await userServices.findByAuth(this.authUserEntry(body, userServices));
		if (user instanceof User === false || user == null) {
			throw new Error('Las credenciales no son validas, acceso no autorizado');
		} else {
			const token: string = this.createToken(user.identification, user.email, user.firstName + ' ' + user.lastName);
			await userServices.addToken(user, token);

			const auth: AuthUser = {
				id: user?.id,
				identification: user?.identification,
				first_name: user?.firstName,
				last_name: user?.lastName,
				email: user?.email,
				phone: user?.phone,
				create_as: user?.createAs,
				update_as: user?.updateAs,
				session_token: user?.sessionToken,
				imagen: user?.imagen,
				is_available: user?.isAvailable,
			};
			return auth;
		}
	}

	/**
	 * authUserEntry function
	 *
	 * @param object
	 * @param userServices
	 * @returns
	 */
	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	public authUserEntry(object: object | any, userServices: UserService): AuthUserEntry {
		const authUser: AuthUserEntry = {
			email: utils.isString(object.email) ? object.email : '',
			password: utils.isString(object.password) ? userServices.cryptPassword(object.password).digest('hex') : '',
		};
		return authUser;
	}

	/**
	 * createToken function
	 * @param userId
	 * @param userName
	 * @param userEmail
	 * @returns
	 */
	public createToken = (userId: number, userName: string, userEmail: string): string => {
		const payload: JwtPayload = {
			id: userId,
			name: userName,
			email: userEmail,
		};

		const token = jwt.sign(payload, env.api.SECRET_KEY, {
			expiresIn: env.jwt.expiresIn,
		});

		return token;
	};
}
