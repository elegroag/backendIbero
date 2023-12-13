import { Request, Response } from 'express';

export class LoginController {
	public constructor() {}

	public getToken(_req: Request, res: Response): Response {
		console.log('APP access', 'Solicitud de token');
		return res.json({
			success: true,
			msj: 'Login token',
		});
	}

	public postAutenticate(_req: Request, res: Response): Response {
		console.log('APP access', 'Autenticate');
		return res.json({
			success: true,
			msj: 'Login autenticate',
		});
	}

	public postSignup(_req: Request, res: Response): Response {
		console.log('APP access', 'Signup');
		return res.json({
			success: true,
			msj: 'Login registro user',
		});
	}
}
