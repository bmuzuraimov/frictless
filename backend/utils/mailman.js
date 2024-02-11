const nodemailer = require("nodemailer");
const { Encipher } = require("./cipherman");
require("dotenv").config();

class EmailSender {
  constructor() {
    this.userEmail = process.env.SENDER_EMAIL;
    this.appPassword = process.env.EMAIL_PASSWORD;
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.userEmail,
        pass: this.appPassword,
      },
    });
  }

  sendEmail(email_to, confirm_code) {
    const encoded_email = Encipher(email_to);
    const confirmationLink = `${
      process.env.FRONTEND_URL
    }?code=${encodeURIComponent(confirm_code)}&email=${encodeURIComponent(
      encoded_email
    )}`;

    const mailOptions = {
      from: this.userEmail, // Make sure this is a professional email address
      to: email_to,
      subject: "Complete Your Registration",
      text: `Hello,
    
    Thank you for registering with us. Please confirm your email address to complete your registration and get started.
    
    Confirm your email: ${confirmationLink}
    
    If you did not initiate this registration, please ignore this email or contact support if you have concerns.
    
    Best,
    Acuella`,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Confirm Your Email</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
            .container { max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            h1 { color: #007bff; }
            a { background: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
            p { margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Acuella!</h1>
            <p>Thank you for signing up. Please confirm your email address to complete your registration and enjoy our services.</p>
            <a href="${confirmationLink}" target="_blank">Confirm Email</a>
            <p>If you did not sign up for an account, no further action is required.</p>
            <p>If you're having trouble clicking the "Confirm Email" button, copy and paste the URL below into your web browser:</p>
            <p><a href="${confirmationLink}" target="_blank">${confirmationLink}</a></p>
            <p>Best Regards,<br>Acuella</p>
        </div>
    </body>
    </html>
    `,
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error); // Changed from alert to console.error for backend logging
      } else {
        console.log("Email sent:", info.response); // Changed from alert to console.log for backend logging
      }
    });
  }
}

const emailSender = new EmailSender();

module.exports = { emailSender };
