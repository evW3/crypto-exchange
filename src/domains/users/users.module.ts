import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/models/users.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}