import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('photos')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))  
  async uploadPhoto(
    @UploadedFile() file: any,  
    @Body() createPhotoDto: CreatePostDto,  
  ) {
    console.log('File:', file); 
    console.log('Body:', createPhotoDto);  

    if (!file) {
      throw new Error('No file uploaded');
    }

    const photo = await this.postService.uploadPhoto(file, createPhotoDto);
    return {
      message: 'Photo uploaded successfully',
      data: photo,
    };
  }
}
