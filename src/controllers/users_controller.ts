import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { HttpException } from '../exceptions/http_exception';

const UsersController = {
	/**
	 * getAll function
	 * @param _req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const userServices = new UserService();
			const users = await userServices.findAll();
			return res.status(201).json({
				success: true,
				msj: 'Proceso de consulta realizado con éxito',
				data: users,
			});
		} catch (error: unknown) {
			next(new HttpException(501, error));
		}
	},

	/**
	 * getUserById function
	 * @param _req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async getUserById(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const userServices = new UserService();
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

	/**
	 * postCreate function
	 * @param _req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async postCreate(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const userServices = new UserService();
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

	/**
	 * deleteEntity function
	 * @param _req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async deleteEntity(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const userServices = new UserService();
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

	/**
	 * putUpEntity function
	 * @param _req
	 * @param res
	 * @param next
	 * @returns Response
	 */
	async putUpEntity(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const userServices = new UserService();
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
