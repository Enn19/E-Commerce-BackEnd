import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';

export const createOrderSchema = joi.object({
    authorization: generalFeild.token,
    address: joi.string().required(),
    phone: joi.string().required(),
    couponName: joi.string(),
    paymentTypes: joi.string().valid("card", "cash"),
    note: joi.string(),
    products: joi.array().items(joi.object({
        quantity: joi.number().min(1).integer().positive(),
        productId: generalFeild._id,
    }))

}).required()

export const cancelOrderSchema = joi.object({
    authorization: generalFeild.token,
   orderId: generalFeild._id
}).required()

export const deliverdOrderSchema = joi.object({
    authorization: generalFeild.token,
   orderId: generalFeild._id
}).required()

