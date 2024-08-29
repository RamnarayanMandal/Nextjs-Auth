import { connect } from "@/dbConfig/dbConfig";
import Assignment from "@/models/assignment";
import { NextRequest, NextResponse } from "next/server";

// Define an interface for the update data
interface UpdateData {
    subject?: string;
    question?: string;
    type?: string;
    option?: string;
    answer?: string;
    marks?: number;
}

export async function PATCH(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        const { assignmentId, subject, question, type, option, answer, marks } = reqBody;

        // Validate required fields
        if (!assignmentId) {
            return NextResponse.json({ error: "Assignment ID is required" }, { status: 400 });
        }

        // Prepare update object with only the fields provided in the request
        const updateData: UpdateData = {};
        if (subject) updateData.subject = subject;
        if (question) updateData.question = question;
        if (type) updateData.type = type;
        if (option) updateData.option = option;
        if (answer) updateData.answer = answer;
        if (marks !== undefined) updateData.marks = marks;

        // Find and update the assignment
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            assignmentId, 
            updateData, 
            { new: true }
        );

        if (!updatedAssignment) {
            return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
        }

        return NextResponse.json(updatedAssignment);
        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
