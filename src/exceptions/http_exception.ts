export enum CodeStatus {
	OK = 200,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
}

export class HttpException extends Error {
	status: number | undefined;
	message!: string;

	constructor(status: number, error: string | Error | unknown) {
		if (typeof error == 'string') {
			super(error);
			this.message = error;
			this.status = 501;
		}
		if (error instanceof Error) {
			super('Error');
			this.status = status;
			this.message = error.message;
		}
	}
}
