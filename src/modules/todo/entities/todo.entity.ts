import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Todo {
  @PrimaryColumn({ type: 'varchar' })
  @Generated('uuid')
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

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'userId' })
  user: User;
}
