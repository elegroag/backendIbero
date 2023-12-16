import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'clientes', schema: 'public' })
export class Cliente {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'int', nullable: false, unique: true })
	cedclie!: number;

	@Column({ type: 'varchar', length: 48 })
	tipdoc!: string;

	@Column({ name: 'last_name', type: 'varchar', length: 48 })
	lastName!: string;

	@Column({ name: 'first_name', type: 'varchar', length: 48 })
	firstName!: string;

	@Column({ type: 'varchar', length: 120, unique: true })
	email!: string;

	@Column({ type: 'varchar', length: 20 })
	phone!: string;

	@Column({ name: 'codstat', type: 'varchar', default: 'A' })
	codstat!: string;

	@CreateDateColumn({ name: 'create_as', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	createAs!: Date;

	@CreateDateColumn({ name: 'update_as', type: 'timestamptz' })
	updateAs!: Date;
}
