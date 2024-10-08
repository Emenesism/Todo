import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TodoModule } from './modules/todo/todo.module';
import { AppConfigModule } from './config/config.module';
import { User } from './modules/users/entities/user.entity';
import { Todo } from './modules/todo/entities/todo.entity';
import { AppLoggerService } from './common/utils/logger.service';
import { BcryptUtils } from './common/utils/password.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure this is the first import
    TypeOrmModule.forRoot({
      type: process.env.DB_DIALECT as
        | 'mysql'
        | 'postgres'
        | 'mariadb'
        | 'sqlite'
        | 'mongodb',
      host: process.env.MYSQL_DB_HOST,
      port: +process.env.MYSQL_DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [User, Todo],
    }),
    AppConfigModule,
    AuthModule,
    UsersModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppLoggerService, BcryptUtils],
})
export class AppModule {}
