import { Response, Request, NextFunction } from 'express';

class SchemaMiddleware {
  public static async handle(
    req: Request,
    res: Response,
    next: NextFunction,
    Validator: any
  ) {
    try {
      if (Validator) {
        await Validator.validateAsync(req.body);
      }
      return next();
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: error.details[0].message,
        data: {}
      });
    }
  }
}

export default SchemaMiddleware;
