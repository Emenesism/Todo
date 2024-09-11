import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';

@Entity()
export class Todo {
  @PrimaryColumn({ type: 'varchar', length: 26 })
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isDone: boolean;

  @Column()
  until: Date;

  @CreateDateColumn()
  createAt: Date;

  constructor() {
    this.id = ulid();
  }
}
