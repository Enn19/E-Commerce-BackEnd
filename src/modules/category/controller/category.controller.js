
import cloudinary from './../../../utils/cloudinary.js';
import categoryModel from './../../../DB/models/category.model.js';
import slugify from 'slugify';
import { asyncHandler } from './../../../utils/asyncHandelar.js';
import { ApiFeatures } from './../../../utils/apiFeatuears.js';

//add category
export const creatCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body
    if (await categoryModel.findOne({ name })) {
        return next(new Error("name aleary exist", { cause: 409 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/category` })
    if (!secure_url) {
        return res.status(409).json({ message: "error happen" })
    }
    req.body.image = { public_id, secure_url }
    req.body.slug = slugify(`${name}`)
    req.body.createdBy=req.user._id
    const category = await categoryModel.create(req.body)
    return res.status(400).json({ message: "done", category })
})
//get all getegory
export const getAllCategory = asyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(categoryModel.find().populate('subCategory'), req.query)
    apiFeatures.pagination().filter().sort().fields().search()
    const query = apiFeatures.mangooseQuery;
    const categories = await query
    return res.status(200).json({ message: "done", categories });
});
//get category by id
export const getIdCategory = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params
    const category = await categoryModel.findById({ _id: categoryId }).populate([{
        path: "subCategory"
    }])
    return res.status(200).json({ message: "done", category })
})
//update category 
export const updateCategory = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params
    const { name } = req.body
    if (await categoryModel.findOne({ name })) {
        return next(new Error("name aleary exist", { cause: 500 }))
    }
    let image = []
    req.files.forEach(async file => {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: 'category' })
        image.push({ secure_url, public_id })
    })
    req.body.updatedBy=req.user._id
    const user = await categoryModel.findByIdAndUpdate({ _id: categoryId }, req.body, { new: true })
    return res.json({ message: "done", user })

}

)

