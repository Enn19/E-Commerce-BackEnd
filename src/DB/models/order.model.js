import mongoose, { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: [true, 'userId is required'],
    ref: 'User'
  },
  products: [
    {
      name: {
        type: String,
        required: true,
        min: 3,
        max: 30
      },
      productId: {
        type: Types.ObjectId,
        required: [true, 'productId is required'],
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      unitPrice: {
        type: Number,
        required: true,
        min: 1
      },
      totalPrice: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  paymentTypes: {
    type: String,
    enum: ["card", "cash"],
    default: "cash"
  },
  finalPrice: {
    type: Number,
    require: true,
    min: 1
  },
  subPrice: {
    type: Number,
    require: true,
    min: 1
  },
  note: String,
  updatedBy:{
    type: Types.ObjectId,
    ref: 'User'
  },
  couponId: {
    type: Types.ObjectId,
    ref: 'Coupon'
  },
  status: {
    type: String,
    enum: ["placed", "onWay", "cancel", "rejected", "deliverd", "waitForPayment"],
    default: "placed"
  },
  reson: String
}, {
  timestamps: true
});

const orderModel = model('Order', orderSchema);

export default orderModel