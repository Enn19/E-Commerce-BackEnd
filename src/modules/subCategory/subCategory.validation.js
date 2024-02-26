import  joi  from 'joi';
import generalFeild from './../../utils/genarelFiled.js';


export const getSubCategorySchema =joi.object({
    subcategoryId:generalFeild._id,
    categoryId:generalFeild._id,
    authorization: generalFeild.token,
}).required()

export const createSubCategorySchema =joi.object({
   name:joi.string().max(10).min(3).trim().required(),
   categoryId:generalFeild._id.required(),
   file:generalFeild.file.required(),
   authorization: generalFeild.token,
   }).required()

   export const updateSubCategorySchema =joi.object({
    subcategoryId:generalFeild._id,
    categoryId:generalFeild._id,
    name:joi.string().max(10).min(3).trim(),
    files:generalFeild.files,
    authorization: generalFeild.token,
   }).required()
 