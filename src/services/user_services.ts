import { User } from '../repositories/entities/user.entity';
import { AppDataSource } from '../lib/data-source';

export class UserServices {
	public constructor() {}

	public async findById(id: number) {
		console.log(id);
		const users = await AppDataSource.getRepository(User).find();
		return users;
	}
}
