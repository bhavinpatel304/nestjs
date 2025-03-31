import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule,
    // CacheModule.register(), 
    CacheModule.register({
      ttl: 5, // Default time-to-live in seconds
      max: 100, // Maximum number of items in cache
    }),
  ], // Import HttpModule
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
