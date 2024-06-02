import User from '@/models/user.Model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashToken,
                verifyExpire: Date.now() + 3600000 
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashToken,
                forgotPasswordExpire: Date.now() + 3600000 
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "45181a669c2f13",
                pass: "587976a54ac537"
            }
        });

        const mailOptions = {
            from: 'nextjsauth@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>
                     <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashToken}">
                       Click here
                     </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
                   </p>
                   <p>
                     Or copy and paste the link below into your browser:
                     <br>
                     ${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashToken}
                   </p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
};
