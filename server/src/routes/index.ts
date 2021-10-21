import { Router } from 'express';

import app from './app';
import auth from './auth';

const router = Router();

router.use('/app', app);

router.use('/auth', auth);

export default router;
