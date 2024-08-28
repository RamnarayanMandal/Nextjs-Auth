import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    subject: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    option: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    marks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);
