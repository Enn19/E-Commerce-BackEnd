import { roles } from "../../middleWar/auth.js"

const couponEndPoint={
    create:[roles.User],
    update:[roles.Admin]
}
export default couponEndPoint