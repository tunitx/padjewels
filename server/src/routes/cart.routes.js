// routes/cartRoutes.js

import express from 'express';
import {
  getCartByUserId,
  addItemOrUpdateItemQuantity,
  removeItemFromCart,
  clearCart,
  addCoupon,
  getCouponByCouponName,
  getAllCoupons,
} from '../controllers/cart.controllers.js';

const router = express.Router();

// router.get('/cart',getCart)
router.post('/cart/add-item/:userId', addItemOrUpdateItemQuantity);

router.post('/cart/add-coupon', addCoupon);
router.get('/cart/coupon/:couponName', getCouponByCouponName);
router.get('/cart/coupons', getAllCoupons);

router.get('/cart/:userId', getCartByUserId);

router.delete('/cart/remove-item/:userId/:productId', removeItemFromCart); // Updated route

router.delete('/cart/clear', clearCart);

export default router;
