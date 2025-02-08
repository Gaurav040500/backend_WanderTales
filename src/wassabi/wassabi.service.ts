import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WasabiService {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      endpoint: this.configService.get<string>('ENDPOINT'),
      region: this.configService.get<string>('S3_BUCKET_REGION') || this.configService.get<string>('REGION'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    console.log('Uploading to Wasabi with the following params:');
    console.log('Bucket:', this.configService.get('S3_BUCKET'));
    console.log('Region:', this.configService.get('S3_BUCKET_REGION') || this.configService.get('REGION'));
    console.log('Endpoint:', this.configService.get('ENDPOINT'));

    const uploadParams = {
      Bucket: this.configService.get('S3_BUCKET'),
      Key: `uploads/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const data = await this.s3.upload(uploadParams).promise();
      return data.Location;
    } catch (error) {
      console.error('Error uploading file to Wasabi:', error);
      throw new Error('File upload failed');
    }
  }
}
