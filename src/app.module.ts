import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';  // Import ConfigModule to load .env variables
import { WasabiModule } from './wassabi/wassabi.module';  // Import your WasabiModule
import { Photo } from './post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'nest-quiz_api',
      synchronize: true,
      entities: [User,Photo], 
    }),
    ConfigModule.forRoot({
      isGlobal: true,  // Make sure it is available globally
    }),
    AuthModule,
    UserModule,
    PostModule,
    WasabiModule,  // Include WasabiModule here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
