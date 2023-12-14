import { User } from '../repositories/entities/user.entity';
import { AppDataSource } from '../lib/data-source';
import { Repository } from 'typeorm';
import * as utils from '../lib/utils';
import { NewUserEntry, AuthUserEntry } from '../types';
import crypto, { Hash } from 'crypto';

export class UserServices {
	private userRepository: Repository<User>;

	constructor() {
		this.userRepository = AppDataSource.getRepository(User);
	}

	public async findAll(): Promise<User[] | null> {
		return await this.userRepository.find();
	}

	public async findById(id: number): Promise<User | null> {
		console.log(id);
		return await this.userRepository.findOneBy({ id: id });
	}

	public async findByIdentification(identification: number): Promise<User | null> {
		console.log(identification);
		return await this.userRepository.findOneBy({ identification: identification });
	}

	public async findByAuth(object: AuthUserEntry): Promise<User | null> {
		return await this.userRepository.findOneBy(object);
	}

	public async create(body: object): Promise<User> {
		const user = new User();
		const params = this.newUserEntry(body);
		user.identification = params.identification;
		user.email = params.email;
		user.firstName = params.first_name;
		user.lastName = params.last_name;
		user.phone = params.phone;
		user.createAs = params.create_as;
		user.updateAs = params.update_as;
		user.imagen = params.imagen;
		user.password = this.cryptPassword(params.password).digest('hex');
		user.sessionToken = params.session_token;
		user.isAvailable = params.is_available;
		await this.userRepository.save(user);
		return user;
	}

	public async addToken(user: User, token: string) {
		user.sessionToken = token;
		await this.userRepository.save(user);
		return user;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public newUserEntry(object: object | any): NewUserEntry {
		const newUser: NewUserEntry = {
			identification: utils.parseNumber(object.identification),
			email: utils.parseEmail(object.email),
			first_name: utils.isString(object.first_name) ? object.first_name : '',
			last_name: utils.isString(object.last_name) ? object.last_name : '',
			phone: utils.isString(object.phone) ? object.phone : '',
			create_as: utils.parseDate(object.create_as),
			update_as: utils.parseDate(object.update_as),
			imagen: utils.isString(object.imagen) ? object.imagen : '',
			password: utils.isString(object.password) ? object.password : '',
			session_token: utils.isString(object.session_token) ? object.session_token : '',
			is_available: utils.isBoolean(object.is_available) ? object.is_available : '',
		};
		return newUser;
	}

	public cryptPassword(pwd: string): Hash {
		return crypto.createHash('sha256').update(String(pwd));
	}
}
