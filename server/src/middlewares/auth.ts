/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 *        @file check_auth.ts
 *  @repository
 * @application
 *     @summary Check Authentication Class
 * @description Authentication middleware that checks logged in user scope
 *     @service - UserService
 *   @functions - check()
 */

import { UserService } from '../services';
import { Response, Request, NextFunction } from 'express';
import { ResponseWrapper } from '../helpers/response_wrapper';
import { User } from '../entities/User';

export class CheckAuth {
  public async check(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      id: vToken.token.body.sub,
      isActive: true
    });
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
