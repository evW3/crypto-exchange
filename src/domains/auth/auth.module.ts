import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { BcryptService } from "./services/bcrypt.service";
import { TokenService } from "./services/token.service";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: process.env.TOKEN_SECRET_KEY,
            signOptions: { expiresIn: process.env.TOKEN_SECRET_EXPIRES_IN },
        })
    ],
    controllers: [AuthController],
    providers: [BcryptService, TokenService],
    exports: []
}) 
export class AuthModule {}