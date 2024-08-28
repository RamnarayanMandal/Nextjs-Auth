import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/user.Model';
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request: NextRequest) {
    await connect();

    try {
        // Extract data from the request body
        const { courseId, courseName, userId } = await request.json();

        // Validate inputs
        if (!courseId || !courseName || !userId) {
            return NextResponse.json({ error: "courseId, courseName, and userId are required" }, { status: 400 });
        }

        // Validate courseId and userId format
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return NextResponse.json({ error: "Invalid courseId format" }, { status: 400 });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: "Invalid userId format" }, { status: 400 });
        }

        // Retrieve the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log("User before update:", user);

        // Ensure the courses array is initialized
        if (!user.courses) {
            user.courses = [];
        }

        // Check if the course already exists
        const existingCourse = user.courses.find(course => course.courseId.toString() === courseId);
        if (existingCourse) {
            return NextResponse.json({ error: "Course already exists" }, { status: 400 });
        }

        // Push new course into the courses array
        user.courses.push({ courseId, courseName });

        // Save the updated user
        await user.save();

        console.log("User after update:", user);

        // Return success response
        return NextResponse.json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while updating the user" }, { status: 500 });
    }
}
