import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { userAccountStatusses } from "src/core/static/enums";
import { authErrorMessages } from "src/core/static/errorMessages";
import { Users } from "src/models/users.model";
import { Repository } from "typeorm";
import { CreateUserAccountDto } from "../dto/createAccount.dto";
import { UserAuthenticationDto } from "../dto/userAuthentication.dto";
import { UserPersonalInformationDto } from "../dto/userPersonalInformation.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}

    async createAccount(createUserAccountDto: CreateUserAccountDto): Promise<Users> {
        return await this.usersRepository.save(createUserAccountDto);
    }

    async getSaltByEmail(email: string): Promise<string> {
        const user = await this.usersRepository.findOne({email});
        return user.password_salt;
    }

    async getUserByEmail(email: string): Promise<Users> {
        return this.usersRepository.findOne({email});
    }

    async userAuthentication(userAuthenticationDto: UserAuthenticationDto): Promise<Users> {
        const expectedAccountStatus = userAccountStatusses.APPROVED;
        const user = await this.usersRepository.findOne(userAuthenticationDto);
        if(user.status !== expectedAccountStatus)
            throw new HttpException(authErrorMessages[user.status], HttpStatus.FORBIDDEN);
        return user;
    }

    async isUserExists(email: string): Promise<boolean> {
        return await this.usersRepository.count({email}) === 1;
    }

    async setUserPersonalInformation(userPersonalInformationDto: UserPersonalInformationDto) {
        const accountPersonalInformationStatus = userAccountStatusses.SET_PERSONAL_INFORMATION;
        return this.usersRepository.update(
            {id: userPersonalInformationDto.id}, 
            {...userPersonalInformationDto, status: accountPersonalInformationStatus}
        );
    }

    async getUserById(id: number): Promise<Users> {
        return this.usersRepository.findOne({id});
    }

    async getEmailById(id: number): Promise<string> {
        const userFromDb = await this.usersRepository.findOne({id});
        return userFromDb.email; 
    }
}