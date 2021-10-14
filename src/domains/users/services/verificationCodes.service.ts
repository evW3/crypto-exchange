import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VerificationCodes } from "src/models/verificationCodes.model";
import { Repository } from "typeorm";

@Injectable()
export class VerificationCodesService {
    constructor(@InjectRepository(VerificationCodes) 
        private readonly verificationCodesRepository: Repository<VerificationCodes>
    ) {}

    async createCode(userId: number): Promise<VerificationCodes> {
        return this.verificationCodesRepository.save({user: { id: userId }});
    }
}