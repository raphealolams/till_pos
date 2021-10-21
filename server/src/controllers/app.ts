/**
 *        @file app.ts
 *  @repository
 * @application
 *     @summary Application Controller Class.
 * @description This file contains function(s) which returns Application related data.
 *   @functions - version()
 *     @returns Express JSON Response
 */

import { Response, Request } from 'express';

import { apiVersion } from '../providers/version';
import { ResponseWrapper } from '../helpers/response_wrapper';

export class AppController {
  public static async version(_req: Request, res: Response) {
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok({
      status: true,
      message: 'successful',
      data: apiVersion
    });
  }
}
