import  express,{ Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as orderController from "./controller/order.controller.js"
import * as orderValidation from "./order.validation.js"
import { validation } from '../../middleWar/validation.js';
import orderEndPoint from './order.endPoint.js';
import stripe from 'stripe'
// ('sk_test_...');
const router = Router()

router
.post('/',
    auth(orderEndPoint.create),
    validation(orderValidation.createOrderSchema),
    orderController.addOrder)
.patch('/:orderId/cancel', 
    auth(orderEndPoint.cancel),
    validation(orderValidation.cancelOrderSchema),
    orderController.cancelOrder)
.patch('/:orderId/deliverd', 
    auth(orderEndPoint.deliverd),
    validation(orderValidation.deliverdOrderSchema),
    orderController.deliverdOrder)


//webhock
router.post('/webhook', express.raw({type: 'application/json'}),orderController.webHockOrder)

export default router