import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   
  app.enableCors({
    // origin: '*', 
    origin:'http://192.168.0.156:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials:true,
  });


  app.useGlobalGuards(new AuthGuard(app.get(Reflector),app.get(JwtService)));

  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    whitelist: true, 
  }));

  const port=process.env.PORT || 8888;

  console.log("app is running on port...",port)
  
  await app.listen(port);
}
bootstrap();
