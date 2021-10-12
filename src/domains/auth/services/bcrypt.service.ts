import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { EncryptDto } from '../dto/encrypt.dto';

@Injectable()
export class BcryptService {
    private readonly saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
    private readonly globalSalt = process.env.BCRYPT_GLOBAL_SALT;

    async encrypt(password: string): Promise<EncryptDto> {
        const passwordSalt: string = await bcrypt.genSalt(this.saltRounds);
        const passwordWithGlobalSalt: string = password + this.globalSalt;
        const encryptedPassword: string = await bcrypt.hash(passwordWithGlobalSalt, passwordSalt);
        return { encryptedPassword, passwordSalt };
    }

    async encryptBySalt(password: string, userSalt: string): Promise<string> {
        const saltPassword: string = password + this.globalSalt;
        return await bcrypt.hash(saltPassword, userSalt);
    }
}