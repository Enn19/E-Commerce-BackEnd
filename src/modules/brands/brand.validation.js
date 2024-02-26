import  joi  from 'joi';
import generalFeild from './../../utils/genarelFiled.js';


export const getBrandSchema =joi.object({
 brandId:generalFeild._id,
 authorization: generalFeild.token,
}).required()

export const createBrandSchema =joi.object({
   name:joi.string().max(10).min(3).trim().required(),
   file:generalFeild.file.required(),
   authorization: generalFeild.token,
   }).required()

   export const updateBrandSchema =joi.object({
    brandId:generalFeild._id,
    name:joi.string().max(10).min(3).trim(),
    files:generalFeild.files,
    authorization: generalFeild.token,
   }).required()