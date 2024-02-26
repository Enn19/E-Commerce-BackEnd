import { asyncHandler } from './../../../utils/asyncHandelar.js';
import productModel from '../../../DB/models/product.model.js';
import cartModel from '../../../DB/models/cart.model.js';
import orderModel from './../../../DB/models/order.model.js';
import couponModel from './../../../DB/models/coupon.model.js';
//add order 
export const addOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    let { products, couponName } = req.body;
    let coupon = { amount: 0 };
    if (couponName) {
        coupon = await couponModel.findOne({ name: couponName, usedBy: { $nin: _id } });
        if (!coupon) {
            return next(new Error(" coupon not found ", { cause: 404 }));
        }
        if (coupon.expireIn.getTime() < new Date().getTime()) {
            return next(new Error(" expire date for coupon ", { cause: 400 }));
        }
        req.body.couponId =coupon._id
    }
    if (!products?.length) {
        const cart = await cartModel.findOne({ userId: _id });
        if (!cart?.products?.length) {
            return next(new Error(" cart not found ", { cause: 404 }));
        }
        products = cart.products.toObject();
    }
    const allProduct = [];
    let subPrice = 0;
    for (const product of products) {
        const productExist = await productModel.findOne({
            _id: product.productId,
            isDeleted: false,
            stock: { $gte: product.quantity }
        });
        if (!productExist) {
            return next(new Error(" product not found ", { cause: 404 }));
        }
        product.name = productExist.name
        product.unitPrice = productExist.finalPrice
        product.totalPrice = productExist.finalPrice * product.quantity
        allProduct.push(product)
        subPrice += product.totalPrice
    }
    for (const product of products) {
        await cartModel.updateOne({ userId: _id }, {
            $pull: {
                products: {
                    productId: { $in: product.productId }
                }
            }
        })
        await productModel.updateOne({ _id: product.productId }, { $inc: { stock: -parseInt(product.quantity) } })
    }
    req.body.products = allProduct;
    req.body.subPrice = subPrice;
    req.body.finalPrice = subPrice - (subPrice * coupon.amount) / 100;


    // Create a new order
    const order = await orderModel.create({
        userId: _id,
        products: allProduct,
        subPrice,
        finalPrice: req.body.finalPrice,
        address: req.body.address,
        phone: req.body.phone,
        paymentTypes: req.body.paymentTypes,
        note: req.body.note,
        couponId: coupon._id,
        couponName: coupon.couponName,
        status: req.body.status,
        reson: req.body.reson
    });
    if (couponName) {
        await couponModel.updateOne({ _id: coupon._id }, { $push: { usedBy: _id } })
    }
    return res.status(201).json({ message: "Order created", order });
}
);
//cancel order
export const cancelOrder = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params
    const order = await orderModel.findOne({ _id: orderId })
    if (!order) {
        return next(new Error(" invalid order id  ", { cause: 404 }))
    }
    if (order.status != "placed" && order.status != "waitForPayment") {
        return next(new Error(" invalid cancel order  ", { cause: 400 }))
    }
    for (const product of order.products) {
        await productModel.updateOne({ _id: product.productId }, { $inc: { stock: parseInt(product.quantity) } })

    }
    if (order.couponId) {
        await couponModel.updateOne({ _id: order.couponId }, { $pull: { usedBy: req.user._id } })

    }
    const updateOrder = await orderModel.updateOne({ _id: orderId }, { status: "cancel", updatedBy: req.user._id })
    return res.status(200).json({ message: "Done", updateOrder });
}
)
//reject order 
export const deliverdOrder = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params
    const order = await orderModel.findOne({ _id: orderId })
    if (!order) {
        return next(new Error(" invalid order id  ", { cause: 404 }))
    }
    if (order.status != "onWay") {
        return next(new Error(" invalid delivered order  ", { cause: 400 }))
    }

    const updateOrder = await orderModel.updateOne({ _id: orderId }, { status: "deliverd", updatedBy: req.user._id })
    return res.status(200).json({ message: "Done", updateOrder });
}
)