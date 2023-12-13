import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts', schema: 'public' })
export class Post {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar', length: 48 })
	title!: string;

	@Column({ type: 'varchar', length: 48 })
	text!: string;
}
