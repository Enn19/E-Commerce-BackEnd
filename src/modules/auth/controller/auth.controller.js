
import cloudinary from './../../../utils/cloudinary.js';
import { asyncHandler } from './../../../utils/asyncHandelar.js';
import userModel from '../../../DB/models/user.model.js';
import { generteToken, verifyToken } from '../../../utils/generateAndVerfiyToken.js';
import sendEmail from '../../../utils/email.js';
import { compare, hash } from '../../../utils/hashAndComparePassword.js';
import { customAlphabet } from 'nanoid'

//sign up
export const signUp = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    if (await userModel.findOne({ email })) {
        return next(new Error("email aleary exist", { cause: 409 }))
    }
    const token = generteToken({
        payload: { email },
        signature: process.env.SIGNUP_SIGNETURE,
        expiresIn: 60 * 30
    })
    const re_token = generteToken({
        payload: { email },
        signature: process.env.SIGNUP_SIGNETURE,
        expiresIn: 60 * 60 * 30
    })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const re_link = `${req.protocol}://${req.headers.host}/auth/refrishToken/${re_token}`
    const html = `
    <a href="${link}">confirm email</a>
    <br/><br/>
    <a href="${re_link}">refrish email</a>
    `
    if (!sendEmail({ to: email, subject: "confirm email", html })) {
        return next(new Error("invalid email", { cause: 404 }))
    }
    req.body.password = hash({ plaintext: req.body.password })
    const newUser = await userModel.create(req.body)
    return res.status(201).json({ message: "done", user: newUser._id })
})
// confirm email
export const confirmEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.params
    const { email } = verifyToken({ token, signature: process.env.SIGNUP_SIGNETURE })
    if (!email) {
        return res.redirect("https://www.youtube.com/")
    }
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.redirect("https://www.youtube.com/")
    }
    if (user.confirmEmail) {
        return res.redirect("https://www.facebook.com/")
    }
    await userModel.updateOne({ email }, { confirmEmail: true })
    return res.redirect("https://www.facebook.com/")
})
//refrish token 
export const refrishToken = asyncHandler(async (req, res, next) => {
    const { token } = req.params
    const { email } = verifyToken({ token, signature: process.env.SIGNUP_SIGNETURE })
    if (!email) {
        return res.redirect("https://www.youtube.com/")
    }
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.redirect("https://www.youtube.com/")
    }
    if (user.confirmEmail) {
        return res.redirect("https://www.facebook.com/")
    }
    const newToken = generteToken({
        payload: { email },
        signature: process.env.SIGNUP_SIGNETURE,
        expiresIn: 60 * 30
    })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
    const html = `
    <a href="${link}">confirm email</a>
    `
    if (!sendEmail({ to: email, subject: "confirm email", html })) {
        return next(new Error("invalid email", { cause: 404 }))
    }
    return res.send("<h1>check email</h1>")
})
//login
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const emailExist = await userModel.findOne({ email })
    if (!emailExist) {
        return next(new Error("email or password not valid", { cause: 400 }))
    }
    if (!emailExist.confirmEmail) {
        return next(new Error("please confirm email first ", { cause: 400 }))
    }
    if (!compare({ plaintext: password, hashValue: emailExist.password })) {
        return next(new Error("email or password not valid", { cause: 400 }))
    }
    const token = generteToken({
        payload: { email, id: emailExist._id },
        signature: process.env.TOKEN_SIGNETURE,
        expiresIn: 60 * 30
    });

    const re_token = generteToken({
        payload: { email, id: emailExist._id },
        signature: process.env.TOKEN_SIGNETURE,
        expiresIn: 60 * 60 * 30
    })
    await userModel.updateOne({ email }, { status: "online" })
    return res.status(200).json({ message: "done", token, re_token })
})
//send code 
export const sendCode = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    const emailExist = await userModel.findOne({ email })
    if (!emailExist) {
        return next(new Error("email or password not valid", { cause: 400 }))
    }
    if (!emailExist.confirmEmail) {
        return next(new Error("please confirm email first ", { cause: 400 }))
    }
    const nanoId = customAlphabet("01010101010", 5)
    const code = nanoId()
    if (!sendEmail({ to: email, subject: "forget password", html: `<p>${code}</p>` })) {
        return next(new Error("failed to send email ", { cause: 400 }))
    }
    await userModel.updateOne({ email }, { code: code }, { new: true })
    return res.status(200).json({ message: "check your email" })
})
//forgetpassword
export const forgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.params
    const { code, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("email not valid", { cause: 400 }))
    }
    if (code != user.code) {
        return next(new Error("invalid code ", { cause: 400 }))
    }
    const newPassword = hash({ plaintext: password })
    await userModel.updateOne({ email }, { password: newPassword, code: null,status:"offline" }, { new: true })
    return res.status(200).json({ message: "done" })
}) 
