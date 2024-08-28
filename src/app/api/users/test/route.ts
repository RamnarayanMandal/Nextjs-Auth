import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        const { userId, courseId, subjectName, mockTestScore } = reqBody;

        if (!userId || !courseId || !subjectName || !mockTestScore) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Find the course within the user's courses array
        const courseIndex = user.courses.findIndex((course) => course.courseId.toString() === courseId);
        if (courseIndex === -1) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Push the new subject and score into the course's subjects array
        user.courses[courseIndex].subjects.push({ subjectName, mockTestScore });

        // Save the updated user document
        await user.save();

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
