import Assignment from "@/models/assignment";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    await connect();

    try {
        const url = new URL(request.url);
        const course = url.searchParams.get("course");

        if (!course) {
            return NextResponse.json({ message: "Course parameter is required" }, { status: 400 });
        }

        const assignments = await Assignment.find({ course });

        if (assignments.length === 0) {
            return NextResponse.json({ message: "No assignments found for this course" }, { status: 404 });
        }

        return NextResponse.json({ message: "Assignments fetched successfully", data: assignments });
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to get assignments", error: error.message }, { status: 500 });
    }
}
