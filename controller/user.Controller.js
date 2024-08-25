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
        subject: `Enquire.!`,
        message: `<h1>Thank You !</h1>
        <p>Thank you so much for valuable time <strong>${req.body.name}</strong> to reach towords me. I'll try my Best to reach you as soon as possible till the you just wait for my reply.</p>
        <b>Once again Thank You So Much..!</b>
        <img style={{ height: 200, width: 400, padding: "20px", objectFit: "contain" }} src="https://d2fl3xywvvllvq.cloudfront.net/wp-content/uploads/2015/07/Collaboration1.jpg" alt="Porfolio-logo"
    />
        <p style={{ marginTop: "300px", color: "ActiveBorder" }}>Best Regards,- Mr. Someshwar Holkar</p>`,
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