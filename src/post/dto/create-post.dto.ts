import { IsString, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  caption: string;

  @IsOptional()
  @IsString()
  name: string;
}
