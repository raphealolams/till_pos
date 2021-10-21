/* eslint-disable @typescript-eslint/ban-types */
/**
 *        @file interface.ts
 *  @repository
 * @application
 *     @summary Interface Classes
 * @description Define various interfaces used accross Application
 *  @interfaces - TokenExpire
 *              - TokenBody
 *              - CUserAuthInfoRequest
 *              - MulterRequest
 */

import { User as UserModel } from '../entities/User';
import { Request } from 'express';

export interface TokenExpire {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TokenBody {
  success: boolean;
  token?: any;
  error?: any;
}

export interface forgotPassword {
  status: boolean;
  message: string;
  data: object;
}

export interface customRequest extends Request {
  user: UserModel;
  file: any;
  receivedAt: any;
  requestId: string;
}

export interface createToken {
  token: string;
  tokenId: any;
}

export interface changePassword {
  status: boolean;
  message: string;
  data: object;
}

export interface registrationObj {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  password: string | undefined;
}
