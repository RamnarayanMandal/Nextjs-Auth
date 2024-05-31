import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/user.Model"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import {sendEmail} from "../../../helpers/mailer"

connect()

export async function POST(request:NextRequest){
    try {
       const reqBody= request.json()
       const {username,email,password}:any = reqBody

       console.log(reqBody);

       const user=await User.findOne({email})
       if(user){
           return NextResponse.json({error:"Email already exists"},{status:400})
       }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const Usernew = new  User({
        username,
        email,
        password:  hashedPassword,
      })

      const newUser = await Usernew.save()
      console.log(newUser);

      // send verification email
    await sendEmail({email, emailType:'VERIFY',userId:newUser._id})

    const responseUser = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        
    };

return NextResponse.json({responseUser,message:" user sucessfully singup",status:201})


        
    } catch (error:any) {
        return NextResponse.json({ error: error.message}, { status:500})
        
    }
}