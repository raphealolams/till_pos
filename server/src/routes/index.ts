import { Router } from 'express';

import app from './app';
import auth from './auth';
import product from './product';

const router = Router();

router.use('/app', app);

router.use('/auth', auth);

router.use('/products', product);

export default router;
