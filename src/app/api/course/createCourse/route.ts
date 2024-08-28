import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import course from "@/models/course";


export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        const { title, description, price, instructor } = reqBody;
        console.log(title, description, price, instructor);
        if (!title || !description || !price || !instructor) {
            return NextResponse.json({ message: "Please provide all the required fields" }, { status: 400 });
        }

        const newCourse = await course.create({ title, description, price, instructor });
        return NextResponse.json(newCourse);
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ message: error.message, success: false, status: 500 });
    }

}