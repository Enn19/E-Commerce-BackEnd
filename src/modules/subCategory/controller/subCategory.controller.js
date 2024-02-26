import cloudinary from './../../../utils/cloudinary.js';
import categoryModel from './../../../DB/models/category.model.js';
import slugify from 'slugify';
import {  asyncHandler } from './../../../utils/asyncHandelar.js';
import subCategoryModel from '../../../DB/models/subCategory.model.js';
//add category
export const creatSubCategory =asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    // Check if category exists
    const foundCategory = await categoryModel.findById(categoryId);
    if (!foundCategory) {
        const error = new Error("Category Not Found");
        error.cause = 404;
        return next(error);
    }
    const { name } = req.body;
    // Check if subcategory name already exists
    const subCategoryExists = await subCategoryModel.findOne({ name });
    if (subCategoryExists) {
        const error = new Error("Name already exists");
        error.cause = 409;
        return next(error);
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `${process.env.APP_NAME}/category/${categoryId}/subcategory` },
    );
    if (!secure_url) {
        const error = new Error("Image not found");
        error.cause = 400;
        return next(error);
    }
    req.body.categoryId = categoryId;
    req.body.image = { public_id, secure_url };
    req.body.slug = slugify(name);
    req.body.createdBy=req.user._id
    const newSubCategory = await subCategoryModel.create(req.body);
    return res.status(201).json({ message: "Done", subCategory: newSubCategory });
});

//get all getegory
export const getAllSubCategory =asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const subCategories = await subCategoryModel.find({ categoryId }).populate([
        {
            path: "categoryId",
        }
    ]);
    return res.status(200).json({ message: "Done", subCategories });
})
//get category by id
export const getIdSubCategory =asyncHandler(async (req, res, next) => {
    const { subcategoryId } = req.params;
    const subCategory = await subCategoryModel.findById(subcategoryId).populate([
        {
            path: "categoryId",
        }
    ]);;
    if (!subCategory) {
        return next(new Error("Category not found", { cause: 404 }));
    }
    return res.status(200).json({ message: "Done", subCategory });
})
//update category 
export const updateSubCategory = asyncHandler(async (req, res, next) => {
    const { subcategoryId } = req.params;
    const { name } = req.body;

    try {
        // Check if subcategory exists
        const subCategory = await subCategoryModel.findById(subcategoryId);

        if (!subCategory) {
            const error = new Error("Invalid SubCategory id");
            error.statusCode = 404;
            return next(error);
        }

        // Check if new name already exists
        if (name !== subCategory.name && (await subCategoryModel.findOne({ name }))) {
            const error = new Error("Name already exists");
            error.statusCode = 400;
            return next(error);
        }

        // Check if a file is included in the request
        if (!req.files || req.files.length === 0) {
            const error = new Error("Image not found in the request");
            error.statusCode = 400;
            return next(error);
        }

        // Upload the new image to Cloudinary
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.files[0].path,
            {
                folder: `${process.env.APP_NAME}/category/${req.params.categoryId}/subCategory`,
            },
        );

        if (!secure_url) {
            const error = new Error("Image not found");
            error.statusCode = 400;
            return next(error);
        }

        if (subCategory.image && subCategory.image.public_id) {
            // Delete the previous image from Cloudinary
            await cloudinary.uploader.destroy(subCategory.image.public_id);
        }

        subCategory.name = name;
        subCategory.image = { public_id, secure_url };
        subCategory.slug = slugify(name);
        subCategory.updatedBy = req.user._id; // Assuming this field is available in your subCategory model

        // Save the updated subcategory
        const updatedSubCategory = await subCategory.save();

        return res.json({ message: "done", subCategory: updatedSubCategory });
    } catch (error) {
        next(error);
    }
});



