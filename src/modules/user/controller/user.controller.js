import { asyncHandler } from './../../../utils/asyncHandelar.js';
import productModel from '../../../DB/models/product.model.js';
import userModel from './../../../DB/models/user.model.js';

//add to wishList
export const addToWishList = asyncHandler(async (req, res, next) => {
    const { productId } = req.params
    const product = await productModel.findOne({ _id: productId, isDeleted: false })
    if (!product) {
        return next(new Error(" invalid product id  ", { cause: 404 }))
    }
    const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { $addToSet: { wishList: product._id } }, { new: true })
        .select('userName email wishList status').populate([
            {
                path:"wishList"
            }
        ])
    return res.status(200).json({ message: "Done", user });
}
)
//reject order 
export const removeFromWishList = asyncHandler(async (req, res, next) => {
    const { productId } = req.params
    const product = await productModel.findOne({ _id: productId, isDeleted: false })
    if (!product) {
        return next(new Error(" invalid product id  ", { cause: 404 }))
    }
    const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { $pull: { wishList: product._id } }, { new: true })
        .select('userName email wishList status').populate([
            {
                path:"wishList"
            }
        ])
    return res.status(200).json({ message: "Done", user });
}
)