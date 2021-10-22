/* eslint-disable @typescript-eslint/no-var-requires */

import jwt from 'njwt';
import bcrypt from 'bcrypt';
import * as config from '../config';

import { logger } from '../providers/logger';

import { TokenBody, createToken, User } from '../typings/interface';

import Users from '../entities/user';

export class UserService {
  expReq?: any;

  expRes?: any;

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
  public static async login(username: string, password: string) {
    return this.getUserAndAuthToken(username, password);
  }

  // Gets user details AND auth token
  public static async getUserAndAuthToken(
    username: string,
    password: string
  ): Promise<{ status: boolean; message: string; data: any }> {
    try {
      const user = Users.find(
        (item) => item.username.trim() === username.trim()
      );
      if (!user) {
        return {
          status: false,
          message: 'invalid username or password',
          data: {}
        };
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return {
          status: false,
          message: '',
          data: {}
        };
      }
      const token = await UserService.createToken(user);
      user.password = '';
      return {
        status: true,
        message: '',
        data: {
          ...user,
          ...token
        }
      };
    } catch (error) {
      logger.error({
        message: `UserService Error`,
        stack: error
      });
      return {
        status: false,
        message: 'invalid username or password',
        data: {}
      };
    }
  }
}

export default UserService;
