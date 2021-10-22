/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserService } from '../services';
import { Response, Request, NextFunction } from 'express';
import { ResponseWrapper } from '../helpers/response_wrapper';

import Users from '../entities/user';

export class CheckAuth {
  public async check(req: Request, res: Response, next: NextFunction) {
    const response: ResponseWrapper = new ResponseWrapper(res);
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return response.forbidden({
        status: false,
        message: 'invalid authorization code',
        data: {}
      });
    }
    const vToken = await UserService.verifyToken(token);
    if (!vToken.success) {
      return response.unauthorized({
        status: false,
        message: 'invalid authorization code',
        data: {}
      });
    }

    const user = await Users.find((item) => item.id === vToken.token.body.sub);
    if (!user) {
      return response.unauthorized({
        status: false,
        message: 'invalid authorization code',
        data: {}
      });
    }
    // @ts-ignore: Unreachable code error
    req.user = user;
    return next();
  }
}

export default new CheckAuth();
