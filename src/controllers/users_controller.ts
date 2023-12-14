import { Request, Response } from 'express';
import { UserServices } from '../services/user_services';

const userServices: UserServices = new UserServices();

const UsersController = {
	async getAll(_req: Request, res: Response): Promise<Response> {
		const users = await userServices.findAll();
		return res.status(201).json({
			success: true,
			msj: 'Proceso de consulta realizado con éxito',
			data: users,
		});
	},
	async getUserById(_req: Request, res: Response): Promise<Response> {
		try {
			const user = await userServices.findByIdentification(_req.body.identification);
			return res.json({
				success: true,
				msj: 'Proceso de consulta realizado con éxito',
				entity: user,
			});
		} catch (error) {
			return res.status(301).json({
				success: false,
				msj: error,
			});
		}
	},
	async postCreate(_req: Request, res: Response): Promise<Response> {
		try {
			console.log('Class Login', 'postSignup');
			const user = await userServices.create(_req.body);
			return res.status(201).json({
				success: true,
				msj: 'Registro de usuario realizado con éxito',
				entity: user,
			});
		} catch (error) {
			return res.status(301).json({
				success: false,
				msj: error,
			});
		}
	},
};

export default UsersController;
