import { Controller, Post,Get } from "@nestjs/common";
import { AuthorService } from "./author.service";

@Controller('authors')
export class AuhtorController{
    constructor(private readonly authorService:AuthorService){}

    @Post()
    async create(){
        
    }

    @Get()
    async findAll(){
    }
}

