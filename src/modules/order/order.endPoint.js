import { roles } from "../../middleWar/auth.js"

const orderEndPoint={
    create:[roles.User],
   cancel:[roles.User],
   deliverd:[roles.Admin]
}
export default orderEndPoint