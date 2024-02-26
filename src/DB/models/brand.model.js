import mongoose, { Schema, Types, model } from "mongoose";

const brandSchema = new Schema({

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
    }
},
    {
        timestamps: true
    })



const brandModel = model('Brand', brandSchema)

export default brandModel