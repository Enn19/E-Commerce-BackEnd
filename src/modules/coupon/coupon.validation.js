import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';


export const getCouponSchema = joi.object({
    couponId: generalFeild._id,
    authorization: generalFeild.token
}).required()

export const createCouponSchema = joi.object({
    name: joi.string().max(10).min(3).trim().required(),
    file: generalFeild.file.required(),
    amount: joi.number(),
    authorization: generalFeild.token,
    expireIn:joi.date()
}).required()

export const updateCouponSchema = joi.object({
    couponId: generalFeild._id,
    name: joi.string().max(10).min(3).trim(),
    files: generalFeild.files,
    amount: joi.number(),
    authorization: generalFeild.token,
    expireIn:joi.date()
}).required()
