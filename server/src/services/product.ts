/* eslint-disable @typescript-eslint/no-var-requires */

import { logger } from '../providers/logger';
import { Product } from '../typings/interface';
import products from '../entities/products';
import { pricing, allowDiscount } from '../entities/pricing';

export class ProductService {
  public static async get(): Promise<{
    status: boolean;
    message: string;
    data: Product[];
  }> {
    try {
      return Promise.resolve({
        status: true,
        message: 'products fetched',
        data: products
      });
    } catch (error) {
      logger.error({
        message: `product Error`,
        stack: error
      });
      return Promise.reject({
        status: false,
        message: 'error occurred',
        data: {}
      });
    }
  }

  public static async productCheckOutPrice(
    cartItems: any,
    customerName: string
  ): Promise<{
    status: boolean;
    message: string;
    data: any;
  }> {
    let total = 0;

    cartItems.map((item: any) => {
      const product = products.find((product) => product.id === item.id);
      if (product) {
        total += pricing[product.id][customerName.toLowerCase()](
          item.quantity,
          product.price,
          allowDiscount[customerName.toLowerCase()].includes(product.id)
            ? true
            : false,
          product.discountPrice
        );
      }
    });

    return Promise.resolve({
      status: true,
      message: 'checkout price fetched',
      data: {
        total
      }
    });
  }
}

export default ProductService;
