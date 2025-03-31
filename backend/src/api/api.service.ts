import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';



@Injectable()
export class ApiService {

    private URI = 'searchteams.php?t=';
  
    private readonly API_URL = 'https://www.thesportsdb.com/api/v1/json/3/'+this.URI;

    private cacheKey = 'teams_data';
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache // Inject CacheManager
  ) {}

  async getCachedItems(){
    try{    
      let cachedData: any = [];
      // cachedData returns null in first time
      cachedData = await this.cacheManager.get(this.cacheKey);
      return { data : cachedData, error:0 ,  message:""}   
    }
    catch(error){
      return { data : {} , error:0 ,  message:""}
    }
  }

  async create(teamData: { name: string }) 
  {
    try{
      let cachedData: any = [];

      // cachedData returns null in first time
      cachedData = await this.cacheManager.get(this.cacheKey);

      let returnFalse = false
      //check if avilable team in cachedData
      if(cachedData)
      {
        cachedData.map((cd)=>{
            if(cd.strTeam.includes(teamData.name.toLocaleLowerCase().trim()) ){
              returnFalse = true              
            }
        })
      }

      if(returnFalse){
        return { data : cachedData , error:1 , message:teamData.name.toLocaleLowerCase().trim() +" is aready added"}
      }

      const response = await firstValueFrom(this.httpService.get(this.API_URL+teamData.name.trim()));
      const team = response.data.teams[0];

      // first time
      if(!cachedData)
      {
        cachedData = []
      }

      if(team == null)
      {
        return { data : cachedData , error:1,  message:teamData.name.trim() +" is invalid team"}
      }   
      else{
        cachedData[cachedData.length] = {
          strLogo:team.strLogo,
          strTeam:team.strTeam.toLowerCase(),
          strLeague:team.strLeague,
          strCountry:team.strCountry,
        };  
      }
      
      await this.cacheManager.set(this.cacheKey, cachedData, 60000);
      return { data : cachedData, error:0 ,  message:"Team "+teamData.name.trim()+" is added"}
    }
    catch (error) {
      return { data : [] , error:1 ,  message:teamData.name.trim() +" is invalid team"}
    }
  }
}
