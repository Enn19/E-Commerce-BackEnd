import { roles } from "../../middleWar/auth.js"

const brandEndPoint={
    create:[roles.Admin],
    update:[roles.Admin]
}
export default brandEndPoint