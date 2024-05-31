import User from '@/models/user.Model';
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"

export const sendEmail = async ({email,emailType,userId}:any)=>{
    try {
        
      const hashToken = await bcryptjs.hash(userId.toString(),10) 

        if(emailType==="VERIFY"){
            await User.findById(userId,
              {verifyToken:hashToken,
                verifyExpire:Date.now()+36000000
              }
            )
        }
        else if(emailType==="RESET"){ 
          await User.findById(userId,
            {forgotPasswordToken:hashToken,
              forgotPasswordExpire:Date.now()+48000000
            }
          )

        }
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailoption ={
            from: 'Ramnarayn@gmail', 
            to: "email", 
            subject: emailType==='VERIFY'?"Verify your email":"Reset your password", 
            html: "<b>Hello world?</b>", 
          }

          const mailResponse = await transporter.sendMail(mailoption)
          return mailResponse
        
    } catch (error:any) {
        console.error(error)
        throw new Error(error.message)
    }
}