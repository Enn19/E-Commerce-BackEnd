import jwt from "jsonwebtoken";

export const generteToken = ({ payload = {}, signature = process.env.TOKEN_SIGNETURE, expiresIn = 60 * 60 } = {}) => {
    const token = jwt.sign(payload, signature, { expiresIn: parseInt(expiresIn) })
    return token
}

export const verifyToken = ({ token, signature = process.env.TOKEN_SIGNETURE } = {}) => {
    const decoded = jwt.verify(token,signature)
    return decoded
}
