import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TodoModule } from './modules/todo/todo.module';
import { AppConfigModule } from './config/config.module';

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
      synchronize: true, // Automatically create database schema (set to false in production)
      autoLoadEntities: true, // Automatically load entities
    }),
    AppConfigModule,
    AuthModule,
    UsersModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
