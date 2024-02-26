import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';

export const addToWishListSchema = joi.object({
    authorization: generalFeild.token,
    productId: generalFeild._id
}).required()

export const removeFromWishListSchema = joi.object({
    authorization: generalFeild.token,
    productId: generalFeild._id
}).required()