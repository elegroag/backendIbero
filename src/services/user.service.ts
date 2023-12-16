import { User } from '../repositories/entities/user.entity';
import { AppDataSource } from '../lib/data-source';
import { DeleteResult, Repository } from 'typeorm';
import * as utils from '../lib/utils';
import { NewUserEntry, AuthUserEntry } from '../types';
import crypto, { Hash } from 'crypto';
import { HttpException } from '../exceptions/http_exception';

/**
 * UserService class
 */
export class UserService {
	private userRepository: Repository<User>;

	constructor() {
		this.userRepository = AppDataSource.getRepository(User);
	}

	/**
	 * findAll function
	 * @returns Promise<User[] | null>
	 */
	public async findAll(): Promise<User[] | null> {
		return await this.userRepository.find();
	}

	/**
	 * findById function
	 * @param id
	 * @returns Promise<User | null>
	 */
	public async findById(id: number): Promise<User | null> {
		console.log(id);
		return await this.userRepository.findOneBy({ id: id });
	}

	/**
	 * findByIdentification function
	 * @param identification
	 * @returns Promise<User | null>
	 */
	public async findByIdentification(identification: number): Promise<User | null> {
		// console.log(identification);
		return await this.userRepository.findOneBy({ identification: identification });
	}

	/**
	 * findByAuth function
	 * @param object
	 * @returns Promise<User | null>
	 */
	public async findByAuth(object: AuthUserEntry): Promise<User | null> {
		return await this.userRepository.findOneBy(object);
	}

	/**
	 * deleteByIdentification function
	 * @param body
	 * @returns Promise<boolean>
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async deleteByIdentification(body: object | any): Promise<boolean> {
		if (utils.isNumber(body.identification) === false) {
			throw new Error('Error no es un número de identificación valido');
		} else {
			const result: DeleteResult = await this.userRepository.delete({
				identification: utils.parseNumber(body.identification),
			});
			return result.affected == 1 ? true : false;
		}
	}

	/**
	 * create function
	 * @param body
	 * @returns Promise<User>
	 */
	public async create(body: object): Promise<User> {
		const user = new User();
		const params = this.userEntry(body);
		const has = await this.findByIdentification(params.identification);
		if (has) {
			throw new HttpException(400, 'El usuario ya existe creado, no se requiere de más acciones.');
		}
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

	/**
	 * update function
	 * @param id
	 * @param body
	 * @returns Promise<User>
	 */
	public async update(id: number, body: object): Promise<User> {
		const user = await this.userRepository.findOneBy({ id: id });
		if (user instanceof User == false || user == null) {
			throw new Error('Error no está disponible la entidad con id ' + id);
		} else {
			const params = this.userEntry(body);
			if (!utils.isEmpty(params.email)) user.email = params.email;
			if (!utils.isEmpty(params.first_name)) user.firstName = params.first_name;
			if (!utils.isEmpty(params.last_name)) user.lastName = params.last_name;
			if (!utils.isEmpty(params.phone)) user.phone = params.phone;
			if (!utils.isEmpty(params.create_as)) user.createAs = params.create_as;
			if (!utils.isEmpty(params.update_as)) user.updateAs = params.update_as;
			if (!utils.isEmpty(params.imagen)) user.imagen = params.imagen;
			if (!utils.isEmpty(params.password)) user.password = this.cryptPassword(params.password).digest('hex');
			if (!utils.isEmpty(params.is_available)) user.isAvailable = params.is_available;
			await this.userRepository.save(user);
			return user;
		}
	}

	/**
	 * addToken function
	 * @param user
	 * @param token
	 * @returns Promise<User>
	 */
	public async addToken(user: User, token: string): Promise<User> {
		user.sessionToken = token;
		await this.userRepository.save(user);
		return user;
	}

	/**
	 * userEntry function
	 * @param object
	 * @returns NewUserEntry
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public userEntry(object: object | any): NewUserEntry {
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

	/**
	 * cryptPassword function
	 * @param pwd
	 * @returns Hash
	 */
	public cryptPassword(pwd: string): Hash {
		return crypto.createHash('sha256').update(String(pwd));
	}
}
