import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HttpException } from '../exceptions/http_exception';

const LoginController = {
	/**
	 * getTest function
	 * @param req
	 * @param res
	 * @returns Response
	 */
	async getTest(req: Request, res: Response): Promise<Response> {
		return res.status(201).json({
			success: true,
			body: req.body,
		});
	},

	/**
	 * postToken function
	 * APP access solicitud de token
	 * @param req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async postToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			// console.log(req.body);
			const authServices = new AuthService();
			const auth = await authServices.processAuth(req.body, new UserService());
			return res.status(201).json({
				success: true,
				token: auth?.session_token,
			});
		} catch (error: unknown) {
			next(new HttpException(501, error));
		}
	},

	/**
	 * postAutenticate function
	 * @param _req
	 * @param res
	 * @returns Response
	 */
	async postAutenticate(_req: Request, res: Response): Promise<Response> {
		console.log('APP access', 'Autenticate');
		return res.json({
			success: true,
			msj: 'Login autenticate',
		});
	},

	/**
	 * postSignup function
	 * @param req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async postSignup(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		console.log('Class Login', 'postSignup');
		try {
			const userServices = new UserService();
			const user = await userServices.create(req.body);

			return res.status(201).json({
				success: true,
				msj: 'Registro de usuario realizado con éxito',
				entity: user,
			});
		} catch (error: unknown) {
			next(new HttpException(501, error));
		}
	},
};

export default LoginController;
