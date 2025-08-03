import nodemailer from "nodemailer";

export const sendMail = async (message) => {
   
    console.log(message);
    
    const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.coom',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'collab0310@gmail.com',
        pass: 'jqry sxss klut tphp',
    },
});
await transporter.sendMail({
    from: 'DigitalDokan<collab0310@gmail.com>',
    to: 'pratikgiri2320@gmail.com',
    subject: 'Password Reset Token',
    text: message,
})
}
