import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import course from "@/models/course";

export async function GET(request: NextRequest){
    await connect()

    try {
        const courses= await course.find()
        const response=NextResponse.json({
            data: courses,
            success: true,
            status: 200,
        })
        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error: "Failed to fetch courses",
            success: false,
            status: 500,
        })
    }
}