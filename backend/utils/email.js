// emailSender.js
const nodemailer = require('nodemailer');
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

    sendEmail(to, code) {
        const mailOptions = {
            from: this.userEmail,
            to: to,
            subject: 'Confirmation Email',
            text: `Your confirmation code is ${code}`,
            html: `<h1>Confirmation Email</h1><p>Your confirmation code is <b>${code}</b>.</p>`,
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
