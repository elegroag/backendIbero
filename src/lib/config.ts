import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env.development' });

export default {
	PORT: process.env.PORT ?? '',
	DEBUG: process.env.DEBUG ?? '',
	HOST: 'localhost',
	db: {
		host: process.env.TYPEORM_HOST ?? 'localhost',
		user: process.env.TYPEORM_USERNAME ?? 'postgres',
		driver: process.env.TYPEORM_DRIVER ?? 'postgres',
		port: Number(process.env.TYPEORM_PORT ?? 5432),
		password: process.env.TYPEORM_PASSWORD ?? '',
		database: process.env.TYPEORM_DATABASE ?? 'postgres',
	},
	api: {
		SECRET_KEY: process.env.SECRET_KEY ?? '',
	},
};
