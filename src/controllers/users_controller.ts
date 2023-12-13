import { Request, Response } from 'express';
import { AppDataSource } from '../lib/data-source';
import { User } from '../repositories/entities/user.entity';

export class UsersController {
	public constructor() {}

	public async getAll(_req: Request, res: Response): Promise<Response> {
		try {
			const users = await AppDataSource.getRepository(User).find();
			return res.json({
				success: true,
				msj: 'User router',
				data: users,
			});
		} catch (error) {
			return res.status(501);
		}
	}

	public postCreate(_req: Request, res: Response): Response {
		console.log('APP access', 'create');
		return res.json({
			success: true,
			msj: 'Registro user',
		});
	}
}
