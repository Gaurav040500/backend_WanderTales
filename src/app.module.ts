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
// import { QuizModule } from './quiz/quiz.module';
// import { Quiz } from './quiz/entity/quiz.entity';

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
      entities: [User], 
    }),
    AuthModule,
    UserModule,
   
  ],
  providers: [],
})
export class AppModule {}
