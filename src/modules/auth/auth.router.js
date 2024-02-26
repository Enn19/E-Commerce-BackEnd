import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as authController from './../auth/controller/auth.controller.js'
import * as authValidation from "./auth.validation.js"
import uploadFile, { fileValidation } from './../../utils/cloudnerMulter.js';
import { validation } from '../../middleWar/validation.js';


const router = Router()

router
    .post('/signUp',
        validation(authValidation.signUpSchema),
        authController.signUp)
    .get('/confirmEmail/:token',
        validation(authValidation.tokenSchema),
        authController.confirmEmail)
    .get('/refrishToken/:token',
        validation(authValidation.tokenSchema),
        authController.refrishToken)
    .post('/login',
        validation(authValidation.loginSchema),
        authController.login)
    .patch("/sendCode",
    validation(authValidation.sendCodeSchema),
    authController.sendCode)
    .put("/forgetPassword/:email",
    validation(authValidation.forgetPasswordSchema),
    authController.forgetPassword)



export default router
