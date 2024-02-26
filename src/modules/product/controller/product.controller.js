import cloudinary from './../../../utils/cloudinary.js';
import { asyncHandler } from './../../../utils/asyncHandelar.js';
import categoryModel from '../../../DB/models/category.model.js';
import subCategoryModel from './../../../DB/models/subCategory.model.js';
import brandModel from './../../../DB/models/brand.model.js';
import slugify from 'slugify';
import { nanoid } from 'nanoid';
import productModel from '../../../DB/models/product.model.js';
import { ApiFeatures } from './../../../utils/apiFeatuears.js';
//add product
export const addProduct = asyncHandler(async (req, res, next) => {
    const { categoryId, subCategoryId, brandId, price, discount } = req.body;
    if (! await categoryModel.findById({ _id: categoryId })) {
        return next(new Error(" invalid category id ", { cause: 404 }))
    }
    if (! await subCategoryModel.findById({ _id: subCategoryId, categoryId })) {
        return next(new Error(" invalid subCategory id ", { cause: 404 }))
    }
    if (! await brandModel.findById({ _id: brandId })) {
        return next(new Error(" invalid brand id ", { cause: 404 }))
    }
    req.body.slug = slugify(req.body.name, {
        trim: true,
        lower: true
    })
    req.body.finalPrice = price - (price * discount || 0) / 100
    req.body.customId = nanoid()
    if (req.files) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.files.mainImage[0].path,
            { folder: `product/${req.body.customId}mainImage` },
        );
        if (!secure_url) {
            const error = new Error("Image not found");
            error.cause = 400;
            return next(error);
        }
        req.body.mainImage = { public_id, secure_url };
    }
    if (req.files.subImage.length) {
        let images = []
        for (const image of req.files.subImage) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(
                image.path,
                { folder: `product/${req.body.customId}/subImage` },
            )
            images.push({ secure_url, public_id })
        }
        req.body.subImage = images
    }
    req.body.createdBy = req.user._id
    const product = await productModel.create(req.body);
    return res.status(201).json({ message: "Done", product });
});
//update product
export const updateProduct = asyncHandler(async (req, res, next) => {
    const { productId } = req.params
    const { name, subCategoryId, brandId, price, discount } = req.body;
    const product = await productModel.findById({ _id: productId })
    if (!product) {
        return next(new Error(" invalid product id ", { cause: 404 }))
    }
    if (subCategoryId && ! await subCategoryModel.findById({ _id: subCategoryId })) {
        return next(new Error(" invalid subCategory id ", { cause: 404 }))
    }
    if (brandId && ! await brandModel.findById({ _id: brandId })) {
        return next(new Error(" invalid brand id ", { cause: 404 }))
    }
    if (name) {
        req.body.slug = slugify(name, {
            trim: true,
            lower: true
        })
    }
    if (price && discount) {
        req.body.finalPrice = price - (price * discount) / 100
    } else if (price) {
        req.body.finalPrice = price - (price * product.discount || 0) / 100
    } else if (discount) {
        req.body.finalPrice = product.price - (product.price * discount) / 100
    }

    if (req.files?.mainImage?.length) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.files.mainImage[0].path,
            { folder: `product/${product.customId}mainImage` },
        );
        if (!secure_url) {
            const error = new Error("Image not found");
            error.cause = 400;
            return next(error);
        }
        await cloudinary.uploader.destroy(product.mainImage.public_id)
        req.body.mainImage = { public_id, secure_url };
    }
    if (req.files?.subImage?.length) {
        let images = []
        for (const image of req.files.subImage) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(
                image.path,
                { folder: `product/${product.customId}/subImage` },
            )
            images.push({ secure_url, public_id })
        }
        req.body.subImage = [...product.subImage,...images]
    }
    req.body.updatedBy = req.user._id
    const updatedProduct = await productModel.findByIdAndUpdate({ _id: productId }, req.body, { new: true });
    return res.status(200).json({ message: "Done", updatedProduct });
}

)
//get all products
export const getAllProduct = asyncHandler(async (req, res, next) => {
    const { page, sort, fields, keyword } = req.query;
    let mongooseQuery = productModel.find();
    const apiFeatures = new ApiFeatures(mongooseQuery, req.query);
    apiFeatures.pagination().filter().sort().fields().search();
    const query = apiFeatures.mangooseQuery;
    const products = await query;
    return res.status(200).json({ message: "done", products });
});

//get product by id
export const getByIdProduct = asyncHandler(async (req, res, next) => {
    const { productId } = req.params
    const product = await productModel.findById({ _id: productId })
    return res.status(200).json({ message: "done",product })
})