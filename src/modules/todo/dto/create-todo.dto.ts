import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title should be string' })
  title: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description should be string' })
  description: string;

  @IsNotEmpty({ message: 'IsDone should not be empty' })
  @IsBoolean({ message: 'IsDone should be boolean' })
  isDone: boolean;

  @IsNotEmpty({ message: 'Until should not be empty' })
  @IsDate({ message: 'Until should be date Format' })
  until: Date;

  @IsNotEmpty({ message: 'UserGmail should not be empty' })
  @IsString({ message: 'UserId should be string' })
  userId: string;
}
