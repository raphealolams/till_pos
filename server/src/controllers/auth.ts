/**
 *        @file auth.ts
 *  @repository
 * @application
 *     @summary Authentication Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - UserService
 *   @functions - login()
 *              - forgotPassword()
 *              - changePassword()
 *     @returns Express JSON Response
 */

import events from '../events';
import { UserService } from '../services';
import { Response, NextFunction } from 'express';
import { ResponseWrapper } from '../helpers/response_wrapper';
import { customRequest } from '../typings/interface';
import { UserEvents } from '../entities/Log';

export class AuthController {
  public static async login(
    req: customRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    const response: ResponseWrapper = new ResponseWrapper(res);

    events.emit(
      'audit_log',
      email,
      req.ip,
      UserEvents.LOGIN,
      req.requestId,
      {
        email
      },
      result
    );
    if (result.status) {
      events.emit('user_login', result.data, req.ip, req.headers.host);
      return response.ok(result);
    }

    events.emit('failed_login', result.data, req.ip, req.headers.host);
    return response.unprocessableEntity(result);
  }

  public static async forgotPassword(
    req: customRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { email } = req.body;
    const response: ResponseWrapper = new ResponseWrapper(res);
    const result = await UserService.forgotPassword(email);
    events.emit(
      'audit_log',
      email,
      req.ip,
      UserEvents.FORGOT_PASSWORD,
      req.requestId,
      {
        email
      },
      result
    );
    return response.ok(result);
  }

  public static async resetPassword(
    req: customRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { token, password } = req.body;
    const response: ResponseWrapper = new ResponseWrapper(res);
    const result = await UserService.resetPassword(token, password);
    events.emit(
      'audit_log',
      '',
      req.ip,
      UserEvents.RESET_PASSWORD,
      req.requestId,
      {
        token
      },
      result
    );
    return response.ok(result);
  }

  public static async changePassword(
    req: customRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const objSysAdmin = req.user;
    const { oldPassword, newPassword } = req.body;

    const userService: UserService = new UserService(objSysAdmin);
    const response: ResponseWrapper = new ResponseWrapper(res);

    const result = await userService.changePassword(oldPassword, newPassword);

    events.emit(
      'audit_log',
      objSysAdmin.email,
      req.ip,
      UserEvents.CHANGE_PASSWORD,
      req.requestId,
      {},
      result
    );
    return response.ok(result);
  }

  public static async register(
    req: customRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { body } = req;
    const response: ResponseWrapper = new ResponseWrapper(res);
    const result = await UserService.register(body);
    delete body.password;
    events.emit(
      'audit_log',
      body.email,
      req.ip,
      UserEvents.SIGNUP,
      req.requestId,
      body,
      result
    );
    return response.created(result);
  }

  public static async me(
    req: customRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const objSysAdmin = req.user;

    const userService: UserService = new UserService(objSysAdmin);
    const response: ResponseWrapper = new ResponseWrapper(res);

    const result = await userService.me();

    return response.ok(result);
  }
}
