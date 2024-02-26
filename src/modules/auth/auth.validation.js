import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';


export const signUpSchema = joi.object({
   userName: joi.string().min(2).max(10).required(),
   email: generalFeild.email,
   password: generalFeild.password,
   cPassword: joi.string().valid(joi.ref("password")).required(),
   file: generalFeild.file,
   phone: joi.string().min(11),
   gender: joi.string()
}).required()

export const tokenSchema = joi.object({
   token: joi.string().required()
}).required()

export const loginSchema = joi.object({
   email: generalFeild.email,
   password: generalFeild.password,
}).required()

export const sendCodeSchema = joi.object({
   email: generalFeild.email
}).required()


export const forgetPasswordSchema = joi.object({
   email: generalFeild.email,
   code: joi.string().pattern(new RegExp(/^[0-9]{5}$/)).required(),
   password: generalFeild.password,
   cPassword: joi.string().valid(joi.ref("password")).required(),
}).required()