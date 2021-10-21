import express from 'express';
import { wrapper } from '../../helpers';
import Schema from '../../middlewares/schema';
import AuthValidator from '../../validators/auth';
import { AuthController } from '../../controllers';
import CheckAuth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  (req, res, next) => {
    Schema.handle(req, res, next, AuthValidator.login());
  },
  wrapper(AuthController.login)
);

export default router;
