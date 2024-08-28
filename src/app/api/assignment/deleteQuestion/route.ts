// /pages/api/assignment/deleteQuestion/[id].ts

import { connect } from "@/dbConfig/dbConfig";
import Assignment from "@/models/assignment";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    await connect();

    try {
        // Parse the request body to get the ID
        const reqBody = await request.json();
        const id = reqBody.id;

        if (!id) {
            return NextResponse.json({ error: "Assignment ID is required" }, { status: 400 });
        }

        // Delete the assignment by ID
        const deletedAssignment = await Assignment.findByIdAndDelete(id);

        if (!deletedAssignment) {
            return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Assignment deleted successfully", success: true }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
