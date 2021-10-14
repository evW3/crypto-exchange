import { Body, Controller, HttpStatus, Patch, Post, UseGuards, UsePipes } from "@nestjs/common";

import { SetUserStatus } from "src/core/decorators/userStatus.decorator";
import { SchemaValidatePipe } from "src/core/pipes/schemaValidate.pipe";
import { userAccountStatusses } from "src/core/static/enums";
import { userMessages } from "src/core/static/messages";
import { ProvidePersonalInformationDto } from "src/domains/users/dto/providePersonalInformation.dto";
import { UserPersonalInformationDto } from "src/domains/users/dto/userPersonalInformation.dto";
import { UsersAccountStatusGuard } from "src/domains/users/guards/usersAccountStatus.guard";
import { ProvidePersonalInformationSchema } from "src/domains/users/schemas/providePersonalInformation.schema";
import { UsersService } from "src/domains/users/services/users.service";
import { SMTPService } from "./services/SMTP.service";
import { VerificationCodesService } from "./services/verificationCodes.service";

@Controller('/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly smtpService: SMTPService,
        private readonly verificationCodesService: VerificationCodesService
    ) {}

    @Patch('/personal-info')
    @SetUserStatus(userAccountStatusses.CREATE_ACCOUNT)
    @UseGuards(UsersAccountStatusGuard)
    @UsePipes(new SchemaValidatePipe(ProvidePersonalInformationSchema))
    async providePersonalInformation(
        @Body() providePersonalInformationDto: ProvidePersonalInformationDto
    ) {
        const userPersonalInformationDto: UserPersonalInformationDto = {
            id: providePersonalInformationDto.id,
            first_name: providePersonalInformationDto.firstName,
            last_name: providePersonalInformationDto.lastName,
            country_of_residence: providePersonalInformationDto.countryOfResidence,
            home_country: providePersonalInformationDto.homeCountry,
            phone_number: providePersonalInformationDto.phoneNumber,
            birth_date: providePersonalInformationDto.birthDate
        }
        await this.usersService.setUserPersonalInformation(userPersonalInformationDto);
        const userEmail = await this.usersService.getEmailById(providePersonalInformationDto.id);
        const verificationCode = await this.verificationCodesService.createCode(providePersonalInformationDto.id);
        this.smtpService.sendMail(`Code to verify ur email: ${verificationCode.code}`, 'Verify email', userEmail);
        return { message: userMessages['SET_PERSONAL_INFORMATION'], status: HttpStatus.OK };
    }

}