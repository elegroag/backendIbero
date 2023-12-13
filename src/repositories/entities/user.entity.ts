import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'public' })
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'int', nullable: false })
	cedclie!: number;

	@Column({ type: 'varchar', length: 48 })
	firstName!: string;

	@Column({ type: 'varchar', length: 48 })
	lastName!: string;

	@Column({ type: 'varchar', length: 120 })
	email!: string;

	@Column({ type: 'varchar', length: 20 })
	phone!: string;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	create_at!: Date;
}
