import { roles } from "../../middleWar/auth.js"

const productEndPoint={
    create:[roles.Admin],
    update:[roles.Admin],
    get:[roles.Admin,roles.User]
}
export default productEndPoint