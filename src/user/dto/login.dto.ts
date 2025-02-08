import { IsEmail, IsString, MinLength } from 'class-validator';



// Define the LoginDto class
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short. It must be at least 6 characters long.' })
  password: string;
}
