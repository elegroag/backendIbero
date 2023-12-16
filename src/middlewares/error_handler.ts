import { Response, Request, NextFunction } from 'express';
import { HttpException } from '../exceptions/http_exception';

export const errorHandler = (err: HttpException, _req: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) {
		console.error('ErrorHandler', err);
		return next(err);
	} else {
		console.error('ErrorHandler', err.message);
		const status = typeof err.status == 'number' ? err.status : 404;
		res.status(status).json({
			success: false,
			message: err.message,
		});
	}
};
