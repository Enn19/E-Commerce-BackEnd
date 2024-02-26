import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as categoryController from './../category/controller/category.controller.js'
import* as categoryValidation from "./category.validations.js"
import uploadFile, { fileValidation } from './../../utils/cloudnerMulter.js';
import subCategoryRouter from"./../subCategory/subCategory.router.js"
import { validation } from '../../middleWar/validation.js';
import categoryEnadPoint from './category.endPoint.js';

const router = Router()

router 
    .post('/',
       auth(categoryEnadPoint.create),
     uploadFile({ customValidation: fileValidation.image }).single('image'),
     validation(categoryValidation.createCategorySchema),
      categoryController.creatCategory)
    .get('/', 
    categoryController.getAllCategory)
    .get('/:categoryId', 
    validation(categoryValidation.getCategorySchema),
    categoryController.getIdCategory)
    .patch('/:categoryId', 
    auth(categoryEnadPoint.update),
    uploadFile({ customValidation: fileValidation.image }).array('image', 3),
    validation(categoryValidation.updateCategorySchema),
     categoryController.updateCategory)
    .use("/:categoryId/subCategory",subCategoryRouter)


export default router
