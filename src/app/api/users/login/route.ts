import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export async function POST(request: NextRequest) {
    await connect();

    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log(email, password);


        if (!email ||!password) {
            return NextResponse.json({ message: "Please provide email and password" }, { status: 400 })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
      
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
       
        if(!isPasswordCorrect) {
            return NextResponse.json({ message: "Password is incorrect" }, { status: 401 })
        }
        if(!user.isVerified){
            return NextResponse.json({ message: "User is not verified" }, { status: 401 })
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.username
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET! as string, { expiresIn: "1d" })

        const response = NextResponse.json({
            token: token,
            message: "User logged in successfully",
            status: 200,
            success: true

        })

        response.cookies.set("token", token,{
            httpOnly: true,
            

        })

        return response

        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
        
    }

}