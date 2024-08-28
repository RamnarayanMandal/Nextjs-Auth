import { connect } from "@/dbConfig/dbConfig";
import assignment from "@/models/assignment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();

        const { subject, question, type, option, answer, instructorId, course } = reqBody;

        // Validate required fields
        if (!subject || !question || !type || !option || !answer || !instructorId || !course) {
            return NextResponse.json({ error: "Please provide all the required fields" }, { status: 400 });
        }

        const newAssignment = new assignment({
            subject,
            question,
            type,
            option,
            answer,
            instructorId,
            course
        });
        await newAssignment.save();

        // Success response after saving the assignment
        return NextResponse.json({ message: "Assignment created successfully" }, { status: 201 });

    } catch (error: any) {
        // Error response in case of any failure
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
