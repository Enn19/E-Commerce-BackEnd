import  joi  from 'joi';
import { idValidation } from '../middleWar/validation.js';
const generalFeild={
    email:joi.string().email({tlds:{allow:["com","net","pro"]}}),
    password:joi.string().pattern(new RegExp('[a-zA-Z0-9]{3,30}$')).required(),
    _id:joi.string().custom(idValidation).required(),
    token:joi.string().required(),
    file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
        finalDest:joi.string()
    }),
    files:joi.array().items(
        joi.object({
            size:joi.number().positive().required(),
            path:joi.string().required(),
            filename:joi.string().required(),
            destination:joi.string().required(),
            mimetype:joi.string().required(),
            encoding:joi.string().required(),
            originalname:joi.string().required(),
            fieldname:joi.string().required(),
            finalDest:joi.string(), 
                secure_url: joi.string().uri(),
                public_id: joi.string()
        })
    )
}
export default generalFeild