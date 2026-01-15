const nodemailer = require('nodemailer');

async function sendMail({ from, to, subject, text, html }) {
    try {
        if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
            console.error('Email configuration is missing. Please check your environment variables.');
            return;
        }

        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: `storeNshare <${from}>`,
            to,
            subject,
            text,
            html
        });

        console.log('Email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
}



module.exports = sendMail;