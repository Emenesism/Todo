import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Todo } from 'src/modules/todo/entities/todo.entity';

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar' })
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
