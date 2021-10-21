
import { UserService } from '../services';
import { Response, NextFunction } from 'express';
import { ResponseWrapper } from '../helpers/response_wrapper';
import { customRequest } from '../typings/interface';

export class AuthController {
  public static async login(
    req: customRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { body: {username, password} } = req;
    const result = await UserService.login(username, password);
    const response: ResponseWrapper = new ResponseWrapper(res);

    if (result.status) {
      return response.ok(result);
    }
    return response.unprocessableEntity(result);
  }
}
