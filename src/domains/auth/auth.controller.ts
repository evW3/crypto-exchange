import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { SchemaValidatePipe } from "src/core/pipes/schemaValidate.pipe";
import { SignUpSchema } from "src/domains/auth/schemas/signUp.schema";
import { UsersService } from "src/domains/users/users.service";
import { SignUpDto } from "src/domains/auth/dto/signUp.dto";
import { CreateUserAccountDto } from "../users/dto/createAccount.dto";
import { BcryptService } from "./services/bcrypt.service";

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly bcryptService: BcryptService
    ) {}

    @Post('/sign-up')
    @UsePipes(new SchemaValidatePipe(SignUpSchema))
    async signUp(@Body() signUpDto: SignUpDto) {
        const encryptResult = await this.bcryptService.encrypt(signUpDto.password);
        const createUserAccountDto: CreateUserAccountDto = {
            email: signUpDto.email,
            password: encryptResult.encryptedPassword,
            password_salt: encryptResult.passwordSalt
        }
        return this.usersService.createAccount(createUserAccountDto);
    }
}