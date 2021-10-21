/* eslint-disable @typescript-eslint/no-var-requires */

import jwt from 'njwt';
import bcrypt from 'bcrypt';
import moment from 'moment';
import * as config from '../config';

import { logger } from '../providers/logger';

import {
  TokenBody,
  createToken,
} from '../typings/interface';

export class UserService {
  expReq?: any;

  expRes?: any;


  constructor(_user: any) {
 
  }

  public static async createToken(user: User): Promise<createToken> {
    const server = config.server;
    const claims = {
      sub: user.id,
      iss: server.hostname
    };

    const jwtObj = jwt.create(claims, server.apiUuid);

    jwtObj.setExpiration(
      new Date().getTime() +
        server.tokenExpiration!.days * 24 * 60 * 60 * 1000 +
        server.tokenExpiration!.hours * 60 * 60 * 1000 +
        server.tokenExpiration!.minutes * 60 * 1000 +
        server.tokenExpiration!.seconds * 1000
    );
    const tokenId = jwtObj.body.toJSON().jti;
    const token = jwtObj.compact();

    return {
      token,
      tokenId
    };
  }

  public static verifyToken(bearer: string): Promise<TokenBody> {
    try {
      const token = jwt.verify(bearer, config.server.apiUuid);
      return Promise.resolve({ success: true, token });
    } catch (err) {
      return Promise.reject({ success: false, error: err });
    }
  }

  // login using username AND password AND get user details AND auth token
  public static async login(email: string, password: string) {
    return this.getUserAndAuthToken(email, password);
  }

  // Gets user details AND auth token
  public static async getUserAndAuthToken(email: string, password: string) {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email, isActive: true });
      if (!user) {
        return {
          status: false,
          message: messages.errors.user.login,
          data: {
            email: ''
          }
        };
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return {
          status: false,
          message: messages.errors.user.login,
          data: {
            email: ''
          }
        };
      }
      const token = await UserService.createToken(user);
      user.password = '';
      return {
        status: true,
        message: messages.success.user.login,
        data: {
          ...user,
          ...token
        }
      };
    } catch (error) {
      logger.error({
        message: `UserService.addUser() Error`,
        stack: error
      });
      return {
        status: false,
        message: messages.errors.user.login,
        data: {
          email: ''
        }
      };
    }
  }
}

export default UserService;
