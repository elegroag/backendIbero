import express, { Response, Request, NextFunction } from 'express';
import createError from 'http-errors';
import { errorHandler, onError } from './middlewares/errors';
import cors from 'cors';
import http from 'http';
import env from './lib/config';
import { AppDataSource } from './lib/data-source';

///routers
import { ClientesRouter } from './routes/clientes_router';
import { LoginRouter } from './routes/login_router';
import { UsersRouter } from './routes/users_router';

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err: Error) => {
		console.error('Error during Data Source initialization:', err);
	});

const app = express();
app.use(express.json());
app.options('*', cors());
app.use(
	cors({
		origin: '*',
		methods: 'GET,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Authentication'],
		exposedHeaders: ['HTTP_X_REQUESTED_WITH', 'XMLHttpRequest', 'Authentication'],
	})
);

app.get('/', (_req, res: Response) => {
	console.log('Inicia la api express typescript');
	// console.log(request.body);
	res.send(`OK API ${new Date().toLocaleDateString()}`);
});

ClientesRouter(app);
LoginRouter(app);
UsersRouter(app);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
	errorHandler(err, res, next);
});

app.use((_req, _res, next) => {
	return next(createError(404, 'La pagina no está disponible'));
});

const server = http.createServer(app);

server.listen(env.PORT, () => {
	console.log(`Server incializa en puerto ${env.PORT} Hora: ${new Date().toLocaleDateString()}`);
});
server.on('error', onError);
