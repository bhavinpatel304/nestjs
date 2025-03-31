
import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios'; 
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager'; 
import { HttpStatus } from '@nestjs/common';
import { CreateTeamDto } from '../dto/create-team.dto';

describe('ApiController', () => {

  let apiController: ApiController;
  let apiService: ApiService;
  
  beforeEach(async () => {

    const app: TestingModule = await Test.createTestingModule({      
      controllers: [ApiController],
      imports: [
        HttpModule, // Import HttpModule to provide HttpService
        CacheModule.register(), // Import CacheModule if needed for caching
      ],
      providers: [
        ApiService,        
        {
          provide: CACHE_MANAGER, // Mock CACHE_MANAGER
          useValue: {
            get: jest.fn(), // Mock get method of the cache manager
            set: jest.fn(), // Mock set method of the cache manager
          },
        },
      ],
    }).compile();

    apiController = app.get<ApiController>(ApiController);
    apiService = app.get<ApiService>(ApiService);
  });


  describe('getCachedItems', () => {
    it('should return cached data with status code 201', async () => {
      // Mock the service method
      const cachedData = {
        data : { strLogo: 'Arse', strTeam: 'Arse', strLeague: 'Arse', strCountry: 'Arse' }
        ,error:0 ,  message:""
      };
      jest.spyOn(apiService, 'getCachedItems').mockResolvedValue(cachedData);

      const result = await apiController.getCachedItems();

      expect(result.statusCode).toBe(HttpStatus.CREATED);
      expect(result.data).toEqual(cachedData);
    });
   
    it('should handle no cached data', async () => {
      // Mock the service method to return empty array
      const cachedData = {
        data : {  }
        ,error:0 ,  message:""
      };
      jest.spyOn(apiService, 'getCachedItems').mockResolvedValue(cachedData);

      const result = await apiController.getCachedItems();

      expect(result.statusCode).toBe(HttpStatus.CREATED);
      expect(result.data).toEqual({
        data : {  }
        ,error:0 ,  message:""
      });
    });

  });
 


  describe('create', () => {
    it('should create a team and return the result with status code 201', async () => {
      // Mock the service method
      const createTeamDto: CreateTeamDto = { name: 'Arsenal' };
      const team:any = { ...createTeamDto };
      jest.spyOn(apiService, 'create').mockResolvedValue(team);

      const result = await apiController.create(createTeamDto);

      expect(result.statusCode).toBe(HttpStatus.CREATED);
      expect(result.data).toEqual(team);
    });

    it('should handle errors during team creation', async () => {
      // Mock the service method to throw an error
      const createTeamDto: CreateTeamDto = { name: 'Arsenal'};
      jest.spyOn(apiService, 'create').mockRejectedValue(new Error('Team creation failed'));

      const result = await apiController.create(createTeamDto);

      expect(result.statusCode).toBe(HttpStatus.CREATED);
      expect(result.data.error).toBe(1);
      expect(result.data.data).toBe('Team creation failed');
    });
  });
 
});
