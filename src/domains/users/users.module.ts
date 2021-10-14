import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TokenMiddleware } from "src/core/middleware/token.middleware";
import { Users } from "src/models/users.model";
import { UsersController } from "src/domains/users/users.controller";
import { UsersService } from "src/domains/users/services/users.service";
import { VerificationCodesService } from "src/domains/users/services/verificationCodes.service";
import { SMTPService } from "src/domains/users/services/SMTP.service";
import { VerificationCodes } from "src/models/verificationCodes.model";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, VerificationCodes]),
        ConfigModule.forRoot({
            envFilePath: [`.${ process.env.NODE_ENV }.env`, '.env']
        }),
        JwtModule.register({
            secret: process.env.TOKEN_SECRET_KEY,
            signOptions: { expiresIn: process.env.TOKEN_SECRET_EXPIRES_IN },
        })
    ],
    controllers: [UsersController],
    providers: [UsersService, VerificationCodesService, SMTPService],
    exports: [UsersService]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TokenMiddleware)
            .forRoutes('users/')
    }
}