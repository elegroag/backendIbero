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
