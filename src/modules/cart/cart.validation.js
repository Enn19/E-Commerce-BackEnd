import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';

export const createCartSchema = joi.object({
    authorization: generalFeild.token,
    quantity: joi.number().min(1).integer().positive(),
    productId: generalFeild._id
}).required()

export const updateCartSchema = joi.object({
    authorization: generalFeild.token,
    productId: generalFeild._id
}).required()

export const clearCartSchema = joi.object({
    authorization: generalFeild.token
}).required()
