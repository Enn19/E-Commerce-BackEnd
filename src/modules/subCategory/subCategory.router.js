import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as subCategoryController from './../subCategory/controller/subCategory.controller.js'
import * as subCategoryValidation from "./subCategory.validation.js"
import uploadFile, { fileValidation } from './../../utils/cloudnerMulter.js';
import { validation } from '../../middleWar/validation.js';
import subCategoryEndPoint from './subCategory.endPoint.js';

const router = Router({mergeParams:true})

router 
    .post('/',
    auth(subCategoryEndPoint.create),
     uploadFile({ customValidation: fileValidation.image }).single('image'),
     validation(subCategoryValidation.createSubCategorySchema),
      subCategoryController.creatSubCategory)
    .get('/',
     subCategoryController.getAllSubCategory)
    .get('/:subcategoryId',
    validation(subCategoryValidation.getSubCategorySchema),
     subCategoryController.getIdSubCategory)
    .patch('/:subcategoryId',
    auth(subCategoryEndPoint.update),
     uploadFile({ customValidation: fileValidation.image }).array('image', 3),
     validation(subCategoryValidation.updateSubCategorySchema),
      subCategoryController.updateSubCategory)


export default router
