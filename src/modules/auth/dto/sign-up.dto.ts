import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsString({ message: 'Name must be string' })
  name: string;

  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsString({ message: 'Password must be string' })
  @Length(6, 100)
  password: string;
}
