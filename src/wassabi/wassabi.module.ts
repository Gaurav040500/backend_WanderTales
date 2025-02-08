import { Module } from '@nestjs/common';
import { WasabiService } from './wassabi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
  providers: [WasabiService],
  exports: [WasabiService], 
})
export class WasabiModule {}
