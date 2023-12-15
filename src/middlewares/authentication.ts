import { Response, Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../lib/config';
import { HttpException } from '../exceptions/http_exception';

export interface CustomRequest extends Request {
	token: string | JwtPayload;
}

export const validaToken = (req: Request, _res: Response, next: NextFunction): void => {
	try {
		const token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
		if (!token) {
			throw new Error('Tu petición no tiene token autorización');
		} else {
			const decoded = jwt.verify(token, env.api.SECRET_KEY);
			(req as CustomRequest).token = decoded;
		}
		next();
	} catch (error) {
		next(new HttpException(403, error));
	}
};

export const decodeUserToken = (req: Request, _res: Response, next: NextFunction) => {
	try {
		const token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
		if (!token) {
			throw new Error('Tu petición no tiene token autorización');
		} else {
			const decoded = jwt.verify(token, env.api.SECRET_KEY);
			(req as CustomRequest).token = decoded;
			if (typeof decoded == 'undefined' || decoded === '') {
				throw new Error('El token ha expirado');
			}
		}
		next();
	} catch (error) {
		next(new HttpException(403, error));
	}
};
