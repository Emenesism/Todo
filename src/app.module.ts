import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [ConfigModule, AuthModule, UsersModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
