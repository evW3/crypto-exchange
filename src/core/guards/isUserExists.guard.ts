import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/domains/users/services/users.service';
import { authErrorMessages } from '../static/errorMessages';

@Injectable()
export class IsUserExists implements CanActivate {
    constructor(private readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const { email } = req.body;
        const isUserExists = await this.usersService.isUserExists(email);
        if(!isUserExists)
            throw new HttpException(authErrorMessages['USER_NOT_EXISTS'], HttpStatus.BAD_REQUEST);
        return true;
    }
}