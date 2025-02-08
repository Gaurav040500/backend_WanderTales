import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short. It must be at least 6 characters long.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;
}
