import { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/user_services';
import { AuthServices } from '../services/auth_service';
import { HttpException } from '../exceptions/http_exception';

const LoginController = {
	async getTest(req: Request, res: Response): Promise<Response> {
		return res.status(201).json({
			success: true,
			body: req.body,
		});
	},

	async postToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		console.log('APP access', 'Solicitud de token');
		try {
			const authServices = new AuthServices();
			const auth = await authServices.processAuth(req.body, new UserServices());
			return res.status(201).json({
				success: true,
				token: auth?.session_token,
			});
		} catch (error: unknown) {
			next(new HttpException(501, error));
		}
	},

	async postAutenticate(_req: Request, res: Response): Promise<Response> {
		console.log('APP access', 'Autenticate');
		return res.json({
			success: true,
			msj: 'Login autenticate',
		});
	},

	async postSignup(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		console.log('Class Login', 'postSignup');
		try {
			const userServices = new UserServices();
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
