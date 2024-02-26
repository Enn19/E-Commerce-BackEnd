import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as userController from "./controller/user.controller.js"
import * as userValidation from "./user.validation.js"
import { validation } from '../../middleWar/validation.js';
import userEndPoint from './user.endPoint.js';
const router = Router()

router
    .patch('/addToWishList/:productId',
        auth(userEndPoint.add),
        validation(userValidation.addToWishListSchema),
        userController.addToWishList)
    .patch('/removeFromWishList/:productId',
        auth(userEndPoint.remove),
        validation(userValidation.removeFromWishListSchema),
        userController.removeFromWishList)


export default router