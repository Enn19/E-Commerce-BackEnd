import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as brandController from './../brands/controller/brand.controller.js'
import * as brandValidation from "./brand.validation.js"
import uploadFile, { fileValidation } from './../../utils/cloudnerMulter.js';
import  {  validation } from '../../middleWar/validation.js';
import brandEndPoint from './brand.endPoint.js';


const router = Router()

router 
    .post('/',
    auth(brandEndPoint.create),
     uploadFile({ customValidation: fileValidation.image }).single('image'),
     validation(brandValidation.createBrandSchema),
      brandController.creatBrand)
    .get('/',
     brandController.getAllBrand)
    .get('/:brandId',
    validation(brandValidation.getBrandSchema),
     brandController.getIdBrand)
    .patch('/:brandId', 
    auth(brandEndPoint.update),
    uploadFile({ customValidation: fileValidation.image }).array('image', 3), 
    validation(brandValidation.updateBrandSchema),
    brandController.updateBrand)
   


export default router
