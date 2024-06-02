import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request:NextRequest){
    await connect();
    try {
        
        const response = NextResponse.json({
            message: "User Logout successfully" ,
            sucesss:true,
            status: 200,

        })

        response.cookies.set("token","",
        {
            expires: new Date(Date.now() - 10000),
            path: "/",
            sameSite: "lax",
            secure: true,
            httpOnly: true
        })

        return response;
        
    } catch (error) {
        
    }
}