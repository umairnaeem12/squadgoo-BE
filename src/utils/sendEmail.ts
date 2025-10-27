import nodemailer from 'nodemailer';


interface SendEmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export const sendEmail = async ({ to, subject, text, html }: SendEmailOptions) => {
    try {
        // Transporter setup (you can use any SMTP provider)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // use true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Define email options
        const mailOptions = {
            from: `"SquadGoo" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html: html || `<p>${text}</p>`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send verification email.");
    }
};
