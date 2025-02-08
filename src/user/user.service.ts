import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(email: string, plainPassword: string, name: string): Promise<Omit<User, 'password'>> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST); // Handle existing user
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword, // Save the hashed password
      name,
    });

    const savedUser = await this.userRepository.save(user);

    // Destructure to remove the password field before returning
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword; // Return user without the password
  }

  // Find a user by email
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Find a user's profile
  async findProfile(email: string): Promise<User | undefined> {
    return this.findUserByEmail(email);
  }

  // Validate the password against the hashed password
  async validateUserPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update user profile (you can expand this as needed)
  async updateProfile(updateProfileDto: UpdateProfileDto) {
    // Your update profile logic here
  }
}
