import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AppLoggerService } from 'src/common/utils/logger.service';
import { TodoRepository } from './repositories/todo.repository';
import { TodoController } from './todo.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, JwtModule],
  providers: [TodoService, AppLoggerService, TodoRepository],
  controllers: [TodoController],
})
export class TodoModule {}
