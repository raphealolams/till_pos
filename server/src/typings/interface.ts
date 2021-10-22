import { Request } from 'express';

export interface TokenBody {
  success: boolean;
  token?: any;
  error?: any;
}

export interface customRequest extends Request {
  user: 'UserModel';
  file: any;
  receivedAt: any;
  requestId: string;
}

export interface createToken {
  token: string;
  tokenId: any;
}

export interface User {
  id: number;
  username: string;
  password: string;
  customerName: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  currency: string;
  quantity: number;
  discountPrice: number;
}
