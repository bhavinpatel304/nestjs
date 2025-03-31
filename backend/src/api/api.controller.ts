
import { Controller, Get, Post, Body, HttpException, HttpStatus,
     UsePipes, ValidationPipe } 
from '@nestjs/common';

import { ApiService } from './api.service';
import { CreateTeamDto } from '../dto/create-team.dto';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    
    @Get('teams') // This is a handler for GET requests to /items
    async getCachedItems() {

        let cachedData: any = [];

        cachedData = await this.apiService.getCachedItems();
        if(!cachedData){            
            // cachedData[0] = {
            //     strLogo:"https://r2.thesportsdb.com/images/media/team/logo/vsqdh71536400613.png",
            //     strTeam:"Arse",
            //     strLeague:"Arse",
            //     strCountry:"Arse",
            // }
        };  
        return { data: cachedData , statusCode: HttpStatus.CREATED };    
    }

    @Post('teams')
    @UsePipes(new ValidationPipe({ whitelist: true ,  transform: true, forbidNonWhitelisted: true, }))
    async create(@Body() createTeamDto: CreateTeamDto) {
    try {
        const team = await this.apiService.create(createTeamDto);
        return { data: team, statusCode: HttpStatus.CREATED };
    } catch (error) {
        return { data: { data : error.message , error:1}, statusCode: HttpStatus.CREATED };
    }
    }
}
