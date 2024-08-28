import { connect } from "@/dbConfig/dbConfig";
import Assignment from "@/models/assignment";  // Correct import using capital letter for model name
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        const { assignmentId, subject, question, type, option, answer, marks } = reqBody; // Use existing fields in your schema

        // Validate required fields based on the fields you want to update
        if (!assignmentId) {
            return NextResponse.json({ error: "Assignment ID is required" }, { status: 400 });
        }

        // Prepare update object with only the fields provided in the request
        const updateData = {};
        if (subject) updateData.subject = subject;
        if (question) updateData.question = question;
        if (type) updateData.type = type;
        if (option) updateData.option = option;
        if (answer) updateData.answer = answer;
        if (marks !== undefined) updateData.marks = marks; // Allow 0 or other falsy values

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
        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
