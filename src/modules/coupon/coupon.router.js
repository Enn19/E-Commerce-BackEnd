import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as couponController from "./../coupon/controller/coupon.controller.js"
import * as couponValidation from "./coupon.validation.js"
import uploadFile, { fileValidation } from './../../utils/cloudnerMulter.js';
import { validation } from '../../middleWar/validation.js';
import couponEndPoint from './coupon.endPoint.js';

const router = Router({mergeParams:true})

router 
    .post('/',
    auth(couponEndPoint.create),
     uploadFile({ customValidation: fileValidation.image }).single('image'),
     validation(couponValidation.createCouponSchema),
      couponController.creatCoupon)
    .get('/',
     couponController.getAllCoupon)
    .get('/:couponId',
    validation(couponValidation.getCouponSchema),
     couponController.getIdCoupon)
    .patch('/:couponId',
    auth(couponEndPoint.update),
     uploadFile({ customValidation: fileValidation.image }).array('image', 3),
     validation(couponValidation.updateCouponSchema),
      couponController.updateCoupon)


export default router