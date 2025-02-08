import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Photo } from './entities/post.entity';  // Adjust the path based on your file structure
import { WasabiModule } from 'src/wassabi/wassabi.module'; // Assuming Wasabi module is imported

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),  // Register the Photo repository for the current module
    WasabiModule,  // Import Wasabi module to handle file uploads
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
