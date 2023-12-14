import { Request, Response } from 'express';
import { UserServices } from '../services/user_services';
import { AuthServices } from '../services/auth_service';

const LoginController = {
	async getTest(req: Request, res: Response): Promise<Response> {
		return res.status(201).json({
			success: true,
			body: req.body,
		});
	},

	async getToken(req: Request, res: Response): Promise<Response> {
		console.log('APP access', 'Solicitud de token');
		try {
			const authServices = new AuthServices();
			const auth = await authServices.processAuth(req.body, new UserServices());
			return res.status(201).json({
				success: true,
				token: auth?.session_token,
			});
		} catch (error) {
			return res.status(404).json({
				success: false,
				msj: error,
			});
		}
	},

	async postAutenticate(_req: Request, res: Response): Promise<Response> {
		console.log('APP access', 'Autenticate');
		return res.json({
			success: true,
			msj: 'Login autenticate',
		});
	},

	async postSignup(req: Request, res: Response): Promise<Response> {
		console.log('Class Login', 'postSignup');

		const userServices = new UserServices();
		const user = await userServices.create(req.body);

		return res.status(201).json({
			success: true,
			msj: 'Registro de usuario realizado con éxito',
			entity: user,
		});
	},
};

export default LoginController;
