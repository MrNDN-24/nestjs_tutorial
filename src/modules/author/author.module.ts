import { Module } from "@nestjs/common";
import { AuhtorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { TypeOrmModule} from "@nestjs/typeorm";
import { Author } from './entities/author.entity';
@Module({
    imports:[TypeOrmModule.forFeature([Author])],
    controllers:[AuhtorController],
    providers:[AuthorService],
})
export class AuthorModule{};
