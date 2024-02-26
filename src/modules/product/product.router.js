import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as productController from "./controller/product.controller.js"
import *as productValidation from "./product.validation.js"
import uploadFile, { fileValidation } from './../../utils/cloudnerMulter.js';
import { validation } from '../../middleWar/validation.js';
import productEndPoint from './product.endpoint.js';


const router = Router({ mergeParams: true })

router
    .post('/',
        auth(productEndPoint.create),
        uploadFile({ customValidation: fileValidation.image }).fields([
            { name: "mainImage", maxCount: 1 },
            { name: "subImage", maxCount: 5 }
        ]),
        validation(productValidation.createProductSchema),
        productController.addProduct)
    .put('/:productId',
        auth(productEndPoint.update),
        uploadFile({ customValidation: fileValidation.image }).fields([
            { name: "mainImage", maxCount: 1 },
            { name: "subImage", maxCount: 5 }
        ]),
        validation(productValidation.updateProductSchema),
        productController.updateProduct)
    .get('/',
        auth(productEndPoint.get),
        productController.getAllProduct)
    .get('/:productId',
        auth(productEndPoint.get),
        validation(productValidation.getByIdSchema),
        productController.getByIdProduct)



export default router