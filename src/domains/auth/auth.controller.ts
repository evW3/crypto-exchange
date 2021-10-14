import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UsePipes } from "@nestjs/common";
import { SchemaValidatePipe } from "src/core/pipes/schemaValidate.pipe";
import { SignUpSchema } from "src/domains/auth/schemas/signUp.schema";
import { UsersService } from "src/domains/users/services/users.service";
import { SignUpDto } from "src/domains/auth/dto/signUp.dto";
import { CreateUserAccountDto } from "src/domains/users/dto/createAccount.dto";
import { BcryptService } from "src/domains/auth/services/bcrypt.service";
import { SignInDto } from "src/domains/auth/dto/signIn.dto";
import { TokenService } from "src/domains/auth/services/token.service";
import { IsUserEmailUnique } from "src/core/guards/isUserEmailUnique.guard";
import { IsUserExists } from "src/core/guards/isUserExists.guard";
import { UserAuthenticationDto } from "../users/dto/userAuthentication.dto";

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly bcryptService: BcryptService,
        private readonly tokenService: TokenService
    ) {}

    @Post('/sign-up')
    @UsePipes(new SchemaValidatePipe(SignUpSchema))
    @UseGuards(IsUserEmailUnique)
    async signUp(@Body() signUpDto: SignUpDto) {
        const encryptResult = await this.bcryptService.encrypt(signUpDto.password);
        const createUserAccountDto: CreateUserAccountDto = {
            email: signUpDto.email,
            password: encryptResult.encryptedPassword,
            password_salt: encryptResult.passwordSalt
        }
        const newUserEntity = await this.usersService.createAccount(createUserAccountDto);
        const token = this.tokenService.createToken(newUserEntity.id);

        return { token };
    }

    @Post('/sign-in')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new SchemaValidatePipe(SignUpSchema))
    @UseGuards(IsUserExists)
    async signIn(@Body() signInDto: SignInDto) {
        const userSalt = await this.usersService.getSaltByEmail(signInDto.email);
        const encryptedPassword = await this.bcryptService.encryptBySalt(signInDto.password, userSalt);
        const userAuthenticationDto: UserAuthenticationDto = {
            email: signInDto.email,
            password: encryptedPassword
        }
        const userFromDB = await this.usersService.userAuthentication(userAuthenticationDto);
        const token = this.tokenService.createToken(userFromDB.id);

        return { token };
    }
}