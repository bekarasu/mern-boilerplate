import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt, { Secret, VerifyErrors } from 'jsonwebtoken';
import AdminUserRepository from '../../../../database/repositories/AdminUserRepository';
import HttpException from '../../../../exceptions/api/HTTPException';
import { IPanelUser } from './../../../../../../@types/client/admin/user.d';
import { AdminUser } from '../../../../models/AdminUser';
import { config } from '../../../../config/config';

class AuthController {
  service = new AdminUserRepository(AdminUser);

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const adminUser = await this.service.find({ username: req.body.username });
      if (adminUser == null || !(await bcrypt.compare(req.body.password, adminUser.password))) {
        throw new HttpException(400, 'Admin Not Found');
      }
      const user: IPanelUser = {
        username: adminUser.username,
        name: adminUser.name,
        role: 'admin',
      };
      if (config.jwtKey == null) {
        throw new HttpException(500, 'JWT Secret Token Not Defined');
      }
      const jwtToken = jwt.sign(user, config.jwtKey, {
        expiresIn: config.jwtExpireTime,
      });
      res.customResponse({ access_token: jwtToken, user: user });
    } catch (e) {
      next(e);
    }
  }

  async getUserByToken(req: Request, response: Response) {
    const accessToken = req.headers.authorization;

    if (accessToken == null) {
      throw new HttpException(500, 'Token Not Found');
    }

    if (!accessToken.startsWith('Bearer ')) {
      throw new HttpException(500, 'JWT Secret Token Not Defined');
    }

    if (config.jwtKey == null) {
      throw new HttpException(500, 'JWT Secret Token Not Defined');
    }

    const token = accessToken.slice(7, accessToken.length);
    const JWT_SECRET: Secret = config.jwtKey;

    jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: object | undefined): void => {
      if (err) {
        response.status(401).setMessage('Unauthenticated').customResponse();
      } else {
        response.status(200).setMessage('Authorized').customResponse({ user: decoded });
      }
    });

    return response;
  }
}

export default new AuthController();
