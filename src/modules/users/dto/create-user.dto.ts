import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'Name must be string' })
  name: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'password must be string' })
  @Length(6, 100, { message: 'The password must at least 6 char' })
  password: string;
}
