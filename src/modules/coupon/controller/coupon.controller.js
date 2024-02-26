import cloudinary from './../../../utils/cloudinary.js';
import { asyncHandler } from './../../../utils/asyncHandelar.js';
import couponModel from '../../../DB/models/coupon.model.js';
//add Coupon
export const creatCoupon =asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    if (await couponModel.findOne({ name })) {
        return next(new Error("name aleary exist",{cause:409}))
    }
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `coupon` },
    );
    if (!secure_url) {
        const error = new Error("Image not found");
        error.cause = 400;
        return next(error);
    }
    req.body.image = { public_id, secure_url };
  }
  req.body.createdBy=req.user._id
    const coupon = await couponModel.create(req.body);
    return res.status(201).json({ message: "Done", coupon });
});
//get all Coupon
export const getAllCoupon =asyncHandler(async (req, res, next) => {
    const coupons = await couponModel.find()
    return res.status(200).json({ message: "done", coupons })
})
//get Coupon by id
export const getIdCoupon =asyncHandler(async (req, res, next) => {
    const { couponId } = req.params
    const coupon = await couponModel.findById({ _id: couponId })
    return res.status(200).json({ message: "done", coupon })
})
//update Coupon
export const updateCoupon =asyncHandler(async (req, res, next) => {
    const {couponId  } = req.params
   let  image = []
    req.files.forEach( async file => {
        const { secure_url, public_id} = await cloudinary.uploader.upload(file.path, {folder: 'coupon'})
        image.push({secure_url, public_id})
    })
    req.body.updatedBy=req.user._id
    const coupon = await couponModel.findByIdAndUpdate({_id: couponId}, req.body, {new: true})

    return res.json({message: "done",coupon})

}

)