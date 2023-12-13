import { Response, NextFunction } from 'express';

export enum HttpCode {
	OK = 200,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
}

export interface AppErrorArgs {
	name?: string;
	httpCode: HttpCode;
	description: string;
	isOperational?: boolean;
}

export class AppError extends Error {
	public readonly name: string;
	public readonly httpCode: HttpCode;
	public readonly isOperational: boolean = true;

	constructor(args: AppErrorArgs) {
		super(args.description);

		Object.setPrototypeOf(this, new.target.prototype);

		this.name = args.name || 'Error';
		this.httpCode = args.httpCode;

		if (args.isOperational !== undefined) {
			this.isOperational = args.isOperational;
		}

		Error.captureStackTrace(this);
	}
}

export const errorHandler = (err: Error, res: Response, next: NextFunction) => {
	console.error(err);
	res.status(501).send({ errors: [{ message: err.message }] });
	next(false);
};

export const onError = (error: Error) => {
	// handle specific listen errors with friendly messages
	switch (error.stack) {
		case 'EACCES':
			console.error(` Requires elevated privileges ${error.message}`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(` Is already in use ${error.message}`);
			process.exit(1);
			break;
		default:
			throw error;
	}
};
