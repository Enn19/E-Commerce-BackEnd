import { roles } from "../../middleWar/auth.js"

const couponEndPoint={
    create:[roles.Admin],
    update:[roles.Admin]
}
export default couponEndPoint