const nodeMailer = require("nodemailer");


let transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
        user: "d188059f4d1cc6",
        pass: "2cbc99bccd514e"
    }
})

let sendMail = (user, subject,  msg) => {
    transporter.sendMail({
        from: "easyjobs@somedomain.com",
        to: user,
        subject: subject,
        text: JSON.stringify(msg) // just for temporary isntread of reformatting we are sending json string object
    })
}

module.exports = sendMail