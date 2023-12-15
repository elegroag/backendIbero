import { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/user_services';
import { HttpException } from '../exceptions/http_exception';

const UsersController = {
	async getAll(_req: Request, res: Response): Promise<Response> {
		const userServices = new UserServices();
		const users = await userServices.findAll();
		return res.status(201).json({
			success: true,
			msj: 'Proceso de consulta realizado con éxito',
			data: users,
		});
	},
	async getUserById(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const userServices = new UserServices();
		try {
			const user = await userServices.findByIdentification(_req.body.identification);
			return res.json({
				success: true,
				msj: 'Proceso de consulta realizado con éxito',
				entity: user,
			});
		} catch (error: unknown) {
			next(new HttpException(501, error));
		}
	},
	async postCreate(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const userServices = new UserServices();
		try {
			console.log('Class Login', 'postSignup');
			const user = await userServices.create(_req.body);
			return res.status(201).json({
				success: true,
				msj: 'Registro de usuario realizado con éxito',
				entity: user,
			});
		} catch (error: unknown) {
			next(new HttpException(501, error));
		}
	},

	async deleteEntity(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const userServices = new UserServices();
		try {
			const out = await userServices.deleteByIdentification(_req.body);
			return res.status(201).json({
				success: out,
				msj: 'Proceso completado con éxito',
			});
		} catch (error) {
			next(new HttpException(501, error));
		}
	},

	async putUpEntity(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const userServices = new UserServices();
		try {
			console.log('Class Login', 'putUpEntity');
			const user = await userServices.update(Number(_req.params.id), _req.body);
			return res.status(201).json({
				success: true,
				msj: 'Proceso realizado con éxito',
				entity: user,
			});
		} catch (error: unknown) {
			next(new HttpException(501, error));
		}
	},
};

export default UsersController;
