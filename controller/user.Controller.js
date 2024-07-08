const { sendEmail } = require("../utils/Email")
const User = require("./../model/Contact")
const asyncHandler = require("express-async-handler")

exports.getAllUser = async (req, res) => {
    try {
        const result = await User.find()
        res.json({ message: "User Get Success", result })
    } catch (error) {
        res.status(400).json({ message: "User controller Error", error: error.message })
    }
}
exports.addUser = asyncHandler(async (req, res) => {
    await User.create(req.body)
    await sendEmail({
        to: req.body.email,
        subject: `<h1>Thank You For Contacting.!</h1>`,
        message: `Hello ${req.body.name},Thank you for reaching out! Your message has been received.`,
    })
    res.json({ message: "User Add Success" })
})
exports.updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: "User Update Success" })
    } catch (error) {
        res.status(400).json({ message: "User Controller Error", error: error.message })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: "User Delete Success" })
    } catch (error) {
        res.status(400).json({ message: "user Controller Error", error: error.message })
    }
}