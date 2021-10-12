import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/models/users.model";
import { Repository } from "typeorm";
import { CreateUserAccountDto } from "./dto/createAccount.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}

    async createAccount(createUserAccountDto: CreateUserAccountDto): Promise<Users> {
        return await this.usersRepository.save(createUserAccountDto);
    }
}