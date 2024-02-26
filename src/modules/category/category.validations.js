import  joi  from 'joi';
import generalFeild from './../../utils/genarelFiled.js';


export const getCategorySchema =joi.object({
 categoryId:generalFeild._id
}).required()

export const createCategorySchema =joi.object({
   name:joi.string().max(10).min(3).trim().required(),
   file:generalFeild.file.required(),
   authorization: joi.string(),
   }).required()

   export const updateCategorySchema =joi.object({
    categoryId:generalFeild._id,
    name:joi.string().max(10).min(3).trim(),
    files:generalFeild.files
   }).required()
 
