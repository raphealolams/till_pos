import express from 'express';
import { wrapper } from '../../helpers';

import { ProductController } from '../../controllers';

const router = express.Router();

router.get('/', wrapper(ProductController.productItems));

router.post('/checkout', wrapper(ProductController.productCheckOutPrice));

export default router;
