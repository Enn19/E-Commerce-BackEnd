import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';
import { idValidation } from '../../middleWar/validation.js';

export const createProductSchema = joi.object({
    authorization: generalFeild.token,
    name: joi.string().max(30).min(3).trim().required(),
    description: joi.string().min(3).max(50),
    files: joi.object({
        mainImage: joi.array().items(generalFeild.file.required()).length(1).required(),
    subImage: joi.array().items(generalFeild.file.required()).min(0).max(5)
    }).required(),
    price: joi.number().min(1).positive().required(),
    discount: joi.number().positive(),
    stock: joi.number().min(1).integer().positive().required(),
    colors: joi.array(),
    size: joi.array(),
    categoryId:generalFeild._id,
    brandId:generalFeild._id,
    subCategoryId:generalFeild._id
}).required()

export const updateProductSchema = joi.object({
    authorization: generalFeild.token,
    name: joi.string().max(30).min(3).trim(),
    description: joi.string().min(3).max(50),
    files: joi.object({
        mainImage: joi.array().items(generalFeild.file.required()).length(1),
    subImage: joi.array().items(generalFeild.file.required()).min(0).max(5)
    }),
    price: joi.number().min(1).positive(),
    discount: joi.number(),
    stock: joi.number().min(1).integer().positive(),
    colors: joi.array(),
    size: joi.array(),
    brandId:joi.custom(idValidation),
    subCategoryId:joi.custom(idValidation),
    productId:generalFeild._id
}).required()

export const getByIdSchema = joi.object({
    authorization: generalFeild.token,
    productId:generalFeild._id
}).required()