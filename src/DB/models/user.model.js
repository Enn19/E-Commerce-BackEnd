import mongoose, { Schema,Types, model } from "mongoose";

const userSchema = new Schema({

    userName: {
        type: String,
        required: [true, 'username is required'],
        min: [2, 'minimum length 2 characters'],
        max: [2, 'maximum length 20 characters'],
        lowercase: true
    },
    email: {
        type: String,
        unique: [true, ' email must be unique'],
        required: [true, 'email is required'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'

    },
    code: String,
    age: Number,
    gender: {
        type: String,
        enum: ['female', 'male'],
        default: 'male'
    },
    phone: String,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'

    },
    address: String,
    image: String,
    DOB: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    wishList: [
        {
            type: Types.ObjectId,
            ref: "Product"
        }
    ]
}, {
    timestamps: true
})

const userModel = model("User", userSchema)


export default userModel

