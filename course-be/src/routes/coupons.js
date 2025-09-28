import express from 'express';
import middlewares from '../middlewares/index.js';
import {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon
} from '../controllers/coupons.js';

const router = express.Router();

router.get('/', getCoupons);
router.get('/:id', getCouponById);

// Chỉ admin thao tác
router.post('/', middlewares.auth, middlewares.role.allowRoles('admin'), createCoupon);
router.patch('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), updateCoupon);
router.delete('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), deleteCoupon);

export default router;
