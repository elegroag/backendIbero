import { Response, Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../lib/config';

export interface CustomRequest extends Request {
	token: string | JwtPayload;
}

export const validaToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
		if (!token) {
			throw new Error('Tu petición no tiene token autorización');
		} else {
			const decoded = jwt.verify(token, env.api.SECRET_KEY);
			(req as CustomRequest).token = decoded;
		}
		next();
	} catch (e) {
		const err = {
			success: false,
			message: 'Error validation token',
			error: e,
		};
		res.status(403).send(err);
	}
};

export const decodeUserToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
		if (!token) {
			throw new Error('Tu petición no tiene token autorización');
		} else {
			const decoded = jwt.verify(token, env.api.SECRET_KEY);
			(req as CustomRequest).token = decoded;
			if (typeof decoded == 'undefined' || decoded === '') {
				const error = {
					success: false,
					message: 'El token ha expirado',
					error: decoded,
				};
				res.status(403).send(error);
			}
		}
		next();
	} catch (e) {
		const err = {
			success: false,
			message: 'Error validation token user',
			error: e,
		};
		res.status(403).send(err);
	}
};
