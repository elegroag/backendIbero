import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'public' })
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'int', nullable: false })
	identification!: number;

	@Column({ name: 'first_name', type: 'varchar', length: 48 })
	firstName!: string;

	@Column({ name: 'last_name', type: 'varchar', length: 48 })
	lastName!: string;

	@Column({ type: 'varchar', length: 120 })
	email!: string;

	@Column({ type: 'varchar', length: 20 })
	phone!: string;

	@CreateDateColumn({ name: 'create_as', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	createAs!: Date;

	@CreateDateColumn({ name: 'update_as', type: 'timestamptz' })
	updateAs!: Date;

	@Column({ type: 'varchar', length: 180 })
	password!: string;

	@Column({ name: 'session_token', type: 'varchar', length: 180 })
	sessionToken!: string;

	@Column({ type: 'varchar', length: 60 })
	imagen!: string;

	@Column({ name: 'is_available', type: 'boolean', default: false })
	isAvailable!: boolean;
}
