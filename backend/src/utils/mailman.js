const nodemailer = require('nodemailer');
const { Encipher } = require('./cipherman');
require('dotenv').config();

class EmailSender {
    constructor() {
        this.userEmail = process.env.SENDER_EMAIL;
        this.appPassword = process.env.EMAIL_PASSWORD;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.userEmail,
                pass: this.appPassword,
            },
        });
    }

    sendEmail(email_to, confirm_code) {
        const encoded_email = Encipher(email_to);
        const mailOptions = {
            from: this.userEmail,
            to: email_to,
            subject: 'Confirmation Email',
            text: `Your confirmation code is ${confirm_code}`,
            html: `<h1>Confirmation Email</h1><p>Please click the link <a href=\"${process.env.FRONTEND_URL}?code=${encodeURIComponent(confirm_code)}&email=${encodeURIComponent(encoded_email)}\">Confirm Sign-up</a></p>`,
        };

        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

const emailSender = new EmailSender();

module.exports = { emailSender };