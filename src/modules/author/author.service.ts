import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Author } from "./entities/author.entity";


@Injectable()
export class AuthorService{
    constructor(@InjectRepository(Author) private authorRepo:Repository<Author> ){}


    async create(){
        
    }

    async findAll(){
    }
}