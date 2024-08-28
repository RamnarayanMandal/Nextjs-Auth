import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import course from "@/models/course";


export async function Delete(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        const { courseId } = reqBody;
        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }
        const courseToDelete = await course.findById(courseId);
        if (!courseToDelete) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }
        await courseToDelete.remove();
        return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });
        
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

}