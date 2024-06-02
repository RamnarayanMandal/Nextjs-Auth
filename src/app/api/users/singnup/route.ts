import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../../helpers/mailer";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { username, email, password,isAdmin
    } = reqBody;

    if(!username || !email || !password){
      return NextResponse.json(
        { error: "Please provide all the required fields" },
        { status: 400 }
      );
    }

    //    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const Usernew = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin
    });

    const newUser = await Usernew.save();
    // console.log(newUser);

    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

    const responseUser = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin

    };

    return NextResponse.json({
      responseUser,
      message: " user sucessfully singup",
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
