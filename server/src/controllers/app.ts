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
