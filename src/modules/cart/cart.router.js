import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as cartController from "./controller/cart.controller.js"
import *as cartValidation from "./cart.validation.js"
import { validation } from '../../middleWar/validation.js';
import cartEndPoint from './cart.endPoint.js';


const router = Router()

router
.post('/',
    auth(cartEndPoint.create),
    validation(cartValidation.createCartSchema),
    cartController.addToCart)
.patch('/:productId', 
    auth(cartEndPoint.update),
    validation(cartValidation.updateCartSchema),
    cartController.deleteFromCart)
.patch('/', 
    auth(cartEndPoint.clear),
    validation(cartValidation.clearCartSchema),
    cartController.clearCart)



export default router