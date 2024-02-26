
import cloudinary from './../../../utils/cloudinary.js';
import slugify from 'slugify';
import { asyncHandler } from './../../../utils/asyncHandelar.js';
import brandModel from '../../../DB/models/brand.model.js';
//add category
export const creatBrand =asyncHandler(async (req, res, next) => {
    const { name } = req.body
    if (await brandModel.findOne({ name })) {
        return next(new Error("name aleary exist",{cause:409}))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/brand` })
    if (!secure_url) {
        return res.status(409).json({ message: "error happen" })
    }
    req.body.image = { public_id, secure_url }
    req.body.slug = slugify(`${name}`)
    req.body.createdBy=req.user._id
    const brand = await brandModel.create(req.body)
    return res.status(400).json({ message: "done", brand })
})
//get all getegory
export const getAllBrand =asyncHandler(async (req, res, next) => {
    const brands = await brandModel.find()
    return res.status(200).json({ message: "done", brands })
})
//get category by id
export const getIdBrand =asyncHandler(async (req, res, next) => {
    const { brandId } = req.params
    const brand = await brandModel.findById({ _id: brandId })
    return res.status(200).json({ message: "done", brand })
})
//update category 
export const updateBrand =asyncHandler(async (req, res, next) => {
    const {brandId  } = req.params
    const{name}=req.body
    if (await brandModel.findOne({name})) {
        return next(new Error("name aleary exist",{cause:500}))
    }
   let  image = []
    req.files.forEach( async file => {
        const { secure_url, public_id} = await cloudinary.uploader.upload(file.path, {folder: 'brands'})
        image.push({secure_url, public_id})
    })
    req.body.updatedBy=req.user._id
    const brand = await brandModel.findByIdAndUpdate({_id: brandId}, req.body, {new: true})

    return res.json({message: "done",brand})

}

)