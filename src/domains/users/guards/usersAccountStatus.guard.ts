import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { USER_STATUS_KEY } from 'src/core/static/constants';
import { usersErrorMessages } from 'src/core/static/errorMessages';
import { UsersService } from 'src/domains/users/services/users.service';

@Injectable()
export class UsersAccountStatusGuard implements CanActivate {
    constructor(private readonly usersService: UsersService,
        private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredStatuses = this.reflector.getAllAndOverride(USER_STATUS_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        const req = context.switchToHttp().getRequest();
        const {id} = req.body;
        const userFromDB = await this.usersService.getUserById(id);

        if(!requiredStatuses.includes(userFromDB.status))
            throw new HttpException(usersErrorMessages['STATUS_NOT_ALLOWED'], HttpStatus.FORBIDDEN);

        return true;
    }
}