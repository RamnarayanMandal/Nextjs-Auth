import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connect()
    try {
        const reqBody =await request.json()
        const { token} = reqBody
        if(!token){
            return NextResponse.json({ error: "Token is required" }, { status: 400 })
        }

        // console.log(token)
        const user = await User.findOne({ verifyToken: token,verifyExpire:{$gt:Date()} })

        if(!user){
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
        }

        // console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyExpire = undefined;

        await user.save()

        return NextResponse.json({ message: "email verified successfully",success:true },
         { status: 200 })
        
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
        
    }
}