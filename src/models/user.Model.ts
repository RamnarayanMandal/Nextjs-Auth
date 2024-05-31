
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"]

    },
    email:{
        type:String,
        required:[true,"please provide a email address"],
        unique:[true,"please provide a unique email address"],
    },
    password:{
        type:String,
        required:[true,"please provide a password "]
    },
    avatar:{
        type:String,
        
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
     ,
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    verifyToken: String,
    verifyExpire: Date,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
   
});

const User = mongoose.models.users||mongoose.model("users",userSchema);

export default User;