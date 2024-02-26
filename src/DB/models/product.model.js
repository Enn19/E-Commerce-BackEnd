
import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        lowercase: true,
        min:3,
        max:30
    },
    slug: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        lowercase: true
    },
    mainImage: {
        type: Object,
        required: [true, 'image is required']
    },
    subImage: [{
        type: Object
    }],
    description: String,
    colors: [String],
    size: [String],
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: 1
    },
    discount: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: [true, 'stock is required']
    },
    finalPrice: {
        type: Number
    },
    brandId: {
        type: Types.ObjectId,
        required: [true, 'brandId is required'],
        ref: 'Brand'
    }, categoryId: {
        type: Types.ObjectId,
        required: [true, 'category id  is required'],
        ref: 'Category'
    },
    subCategoryId: {
        type: Types.ObjectId,
        required: [true, 'subCategory id  is required'],
        ref: 'SubCategory'
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
    isDeleted: {
        type: Boolean,
        default: false
    },
    customId: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

const productModel = model('Product', productSchema)

export default productModel