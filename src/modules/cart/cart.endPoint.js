import { roles } from "../../middleWar/auth.js"

const cartEndPoint={
    create:[roles.User],
    update:[roles.User],
    clear:[roles.User]
}
export default cartEndPoint