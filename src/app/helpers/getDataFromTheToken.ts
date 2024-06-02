import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function getDataFromTheToken(request: NextRequest) {
    try {

        const token = request.cookies.get("token")?.value||"";
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        
        return decodedToken.id;
        
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            message: "Something went wrong while accessing the token",
            sucesss:false,
            status: 500,
            error:error.message
        });

        
    }
}