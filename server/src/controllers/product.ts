import { ProductService } from '../services';
import { Response, NextFunction } from 'express';
import { ResponseWrapper } from '../helpers/response_wrapper';
import { customRequest } from '../typings/interface';

export class ProductController {
  public static async productItems(
    req: customRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const result = await ProductService.get();
    const response: ResponseWrapper = new ResponseWrapper(res);

    if (result.status) {
      return response.ok(result);
    }
    return response.unprocessableEntity(result);
  }

  public static async productCheckOutPrice(
    req: customRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const {
      body: { cartItems, customerName }
    } = req;

    const response: ResponseWrapper = new ResponseWrapper(res);
    if (!cartItems || !customerName) {
      return response.badRequest({
        status: false,
        message: 'missing or empty request body',
        data: {}
      });
    }

    const result = await ProductService.productCheckOutPrice(
      cartItems,
      customerName
    );

    if (result.status) {
      return response.ok(result);
    }
    return response.unprocessableEntity(result);
  }
}
