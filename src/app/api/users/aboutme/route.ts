import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/user.Model'
import { NextRequest,NextResponse } from "next/server";
import { getDataFromTheToken } from "@/app/helpers/getDataFromTheToken";

export async function POST(request:NextRequest){
    await connect()
     
    try {
       
        const userId=await getDataFromTheToken(request)
     
     const user = await User.findOne({_id: userId}).select("-password")
     if(!user){
         return NextResponse.json({
             message: "User not found",
             sucesss:false,
             status: 404,
         });
     }

     return NextResponse.json({
         message: "User found",
         sucesss:true,
         status: 200,
         data:user
     });
     
        
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({
            message: error.message,
            sucesss:false,
            status: 500,
         
        });
        
    }
}