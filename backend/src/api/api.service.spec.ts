import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios'; 
import { CacheModule } from '@nestjs/cache-manager'; 

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule, // Import HttpModule to provide HttpService
        CacheModule.register(), // Import CacheModule if needed for caching
      ],
      providers: [ApiService],
      
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
