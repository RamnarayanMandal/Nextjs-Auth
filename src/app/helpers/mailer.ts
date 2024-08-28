import User from '@/models/user.Model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashToken,
          verifyExpire: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashToken,
          forgotPasswordExpire: Date.now() + 3600000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'amitkumar425863@gmail.com', // Your Gmail address
        pass: 'wqql hbvq udjt erat', // Your Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: 'amitkumar425863@gmail.com', // Use the same Gmail address here
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
