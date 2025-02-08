import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WasabiService } from '../wassabi/wassabi.service';
import { Photo } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly wasabiService: WasabiService,
  ) {}

  async uploadPhoto(file: Express.Multer.File, createPostDto: CreatePostDto): Promise<Photo> {
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }

      const fileUrl = await this.wasabiService.uploadFile(file);

      const photo = this.photoRepository.create({
        url: fileUrl,
        name: createPostDto.name,
        caption: createPostDto.caption || '',
      });

      return await this.photoRepository.save(photo);
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw new Error('Photo upload failed');
    }
  }
}
