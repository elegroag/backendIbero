import 'reflect-metadata';
import { DataSource } from 'typeorm';
import env from './config';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: env.db.host,
	username: env.db.user,
	database: env.db.database,
	password: env.db.password,
	port: env.db.port,
	entities: ['src/repositories/entities/*.entity.ts'],
	migrations: ['src/migrations/*.ts'],
	migrationsTableName: 'migrations',
	synchronize: false,
	migrationsRun: false,
	logging: false,
	logger: 'simple-console',
	dropSchema: false,
	logNotifications: false,
	cache: false,
	poolErrorHandler: (error: Error) => {
		console.log('ErrorAqui', error);
	},
});
