import mongoose, { Schema, Types, model } from "mongoose";

const subCategorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        lowercase: true
    },
    image: {
        type: Object,
        required: [true, 'image is required']
    },
    slug: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        lowercase: true
    },
    createdBy: {
        type: Types.ObjectId,
        required: [true, 'createdBy is required'],
        ref: 'User'
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    categoryId: {
        type: Types.ObjectId,
        required: [true, 'category id  is required'],
        ref: 'Category'
    }
},
    {
        timestamps: true
    })

const subCategoryModel = model('SubCategory', subCategorySchema)

export default subCategoryModel