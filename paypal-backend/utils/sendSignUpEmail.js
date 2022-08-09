/* eslint-disable no-undef */
const nodemailer = require('nodemailer');
const verifyEmail = require('../pages/verifyEmail');


module.exports = async (email, subject, text, user) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            PORT:Number( process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });


        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: verifyEmail(text, user)
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Email not sent');
        console.log(error);
    }
};
