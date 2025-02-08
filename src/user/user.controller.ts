import { Controller, Post, Body, Get, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorators';
import { UpdateProfileDto } from './dto/update.dto';

@Controller('user')
@Public() // Public decorator to allow open access to these routes
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  // Signup route
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const { email, password, name } = signupDto;
    return this.userService.createUser(email, password, name);
  }

  // Profile retrieval route
  @Public()
  @Get('profile')
  async userProfile(@Body() { email }: { email: string }) {
    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }

    const profile = await this.userService.findProfile(email);
    if (!profile) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { password, ...profileWithoutPassword } = profile; 
    return profileWithoutPassword; 
  }

  // Edit profile route (you can expand this if needed)
  @Public()
  @Patch('edit')
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfile(updateProfileDto);
  }
}
