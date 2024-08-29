import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import course from "@/models/course";

export async function PUT(request: NextRequest){
    await connect()
    try {
        const reqBody = await request.json()
        const { id, title, description, price, instructor } = reqBody
        if(!id){
            return NextResponse.json({ error: "Id is required" }, { status: 400 })
        }
        const updatedCourse = await course.findByIdAndUpdate(id, {title, description, price, instructor }, { new: true })
        if(!updatedCourse){
            return NextResponse.json({ error: "Course not found" }, { status: 404 })
        }
        return NextResponse.json(updatedCourse)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
