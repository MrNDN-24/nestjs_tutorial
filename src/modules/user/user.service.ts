import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async register(data: CreateUserDto): Promise<User> {
    try {
      const existing = await this.userRepo.findOneBy({
        username: data.username,
      });
      if (existing) {
        throw new BadRequestException('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = this.userRepo.create({ ...data, password: hashedPassword });
      return await this.userRepo.save(user);
    } catch (error) {
      throw new BadRequestException(
        `Failed to register user: ${error.message}`,
      );
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepo.findOneBy({ username });
      if (!user) {
        throw new NotFoundException(
          `User with username "${username}" not found`,
        );
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to find user: ${error.message}`,
      );
    }
  }
}
