import { connection } from "./DB/connection.js"
import categoryRouter from "./modules/category/category.router.js"
import subCategoryRouter from "./modules/subCategory/subCategory.router.js"
import couponRouter from "./modules/coupon/coupon.router.js"
import brandRouter from "./modules/brands/brand.router.js"
import authRouter from "./modules/auth/auth.router.js"
import productRouter from "./modules/product/product.router.js"
import cartRouter from "./modules/cart/cart.router.js"
import orderRouter from "./modules/order/order.router.js"
import userRouter from "./modules/user/user.router.js"
import { globalError } from "./utils/asyncHandelar.js"

const bootstrap = (app, express) => {
    app.use((req, res, next) => {
        if (req.originalUrl == "/order/webhook") {
            return next()
        }else{
            express.json({})(req, res, next)
        } 
    })
    app.use("/uploads", express.static("uploads"))
    app.use("/user", userRouter)
    app.use("/category", categoryRouter)
    app.use("/subCategory", subCategoryRouter)
    app.use("/coupon", couponRouter)
    app.use("/brand", brandRouter)
    app.use("/auth", authRouter)
    app.use("/product", productRouter)
    app.use("/cart", cartRouter)
    app.use("/order", orderRouter)
    connection()
    app.use(globalError)
}

export default bootstrap