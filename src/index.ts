import 'reflect-metadata';
import express, { Response } from 'express';
import createError from 'http-errors';
import { errorHandler } from './middlewares/error_handler';
import { onError } from './exceptions/on_error';
import cors from 'cors';
import http from 'http';
import env from './lib/config';
import { AppDataSource } from './lib/data-source';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';

///routers
import { ClientesRouter } from './routes/clientes_router';
import { LoginRouter } from './routes/login_router';
import { UsersRouter } from './routes/users_router';

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');

		const app = express();
		app.use(express.json());
		app.use(bodyParser.json());
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

		app.use(methodOverride());

		app.get('/', (_req, res: Response) => {
			console.log('Inicia la api express typescript');
			// console.log(request.body);
			res.send(`OK API ${new Date().toLocaleDateString()}`);
		});

		ClientesRouter(app);
		LoginRouter(app);
		UsersRouter(app);

		app.use(errorHandler);

		app.use((_req, _res, next) => {
			return next(createError(404, 'La pagina no está disponible'));
		});

		const server = http.createServer(app);

		server.listen(env.PORT, () => {
			console.log(`Server incializa en puerto ${env.PORT} Hora: ${new Date().toLocaleDateString()}`);
		});
		server.on('ErrorServer', onError);
	})
	.catch((err: Error) => {
		console.error('Error during Data Source initialization:', err);
	});
