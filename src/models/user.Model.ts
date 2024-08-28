import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: [true, "Email address must be unique"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  avatar: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpire: Date,
  verifyToken: String,
  verifyExpire: Date,
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course",
      },
      courseName: {
        type: String,
    
      },
      subjects: [
        {
          subjectName: {
            type: String,
    
          },
          mockTestScore: {
            type: Number,
            default: 0, // Default score if needed
          },
        },
      ],
    },
  ],
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
