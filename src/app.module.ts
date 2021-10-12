import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/domains/users/users.module';
import { Users } from 'src/models/users.model';
import { AuthModule } from './domains/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.${ process.env.NODE_ENV }.env`, '.env']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Users
      ],
      synchronize: !!(process.env.DB_SYNCHRONIZE === 'true' ? 1 : 0),
    }),
    UsersModule,
    AuthModule
  ]
})
export class AppModule {}
