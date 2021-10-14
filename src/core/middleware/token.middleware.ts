import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

import { tokenErrorMessages } from 'src/core/static/errorMessages';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token: string | undefined = req?.headers?.authorization?.split(' ')[1];

            if(token) {
                const params = this.jwtService.verify(token);

                if(params.id) {
                    delete params.iat;
                    delete params.exp;
                    req.body = { ...req.body, ...params };
                    next();
                } else
                    next(new HttpException(tokenErrorMessages['TOKEN_ID_UNDEFINED'], HttpStatus.FORBIDDEN));

            } else
                next(new HttpException(tokenErrorMessages['TOKEN_EMPTY'], HttpStatus.FORBIDDEN));

        } catch (e) {
            next(new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}