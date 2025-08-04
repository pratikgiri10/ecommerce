import nodemailer from "nodemailer";

export const sendMail = async (message) => {
   
    console.log(message);
    
    const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
    },
});
await transporter.sendMail({
    from: `DigitalDokan<${process.env.SMTP_EMAIL}>`,
    to: 'pratikgiri2320@gmail.com',
    subject: 'Password Reset Token',
    text: message,
})
}
