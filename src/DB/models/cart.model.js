import mongoose, { Schema, Types, model } from "mongoose";

const cartSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        required: [true, 'userId is required'],
        ref: 'User',
        unique: true
    },
    products: [
        {
            productId: {
                type: Types.ObjectId,
                required: [true, 'productId is required'],
                ref: 'Product',
                unique: true
            },
            quantity: {
                type: Number,
                required: true,
                min:1
            }
        }
    ]
},
    {
        timestamps: true
    })



const cartModel = model('Cart', cartSchema)

export default cartModel