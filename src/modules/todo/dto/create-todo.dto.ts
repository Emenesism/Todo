import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title should be string' })
  title: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description should be string' })
  description: string;

  @IsNotEmpty({ message: 'Until should not be empty' })
  @IsDateString({}, { message: 'Until should be date Format' })
  until: Date;

  userId: string;
}
