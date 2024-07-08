const nodeMailer = require("nodemailer")

exports.sendEmail = ({ to, subject, message }) => new Promise((resolve, reject) => {
    const mailer = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            pass: process.env.SERVER_CODE,
            user: process.env.USER
        }
    })
    mailer.sendMail({
        to: to,
        subject: subject,
        text: message
    }, (err) => {
        if (err) {
            reject("Unable To Send Email" + err.message)
        }
        console.log("Email Send SuccessFully")
        resolve(true)
    })
})