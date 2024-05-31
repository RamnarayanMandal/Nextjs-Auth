import { error } from 'console';
import mongoose from 'mongoose'

export  async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("Connected to MongoDB")
        })

        connection.on('error',()=>{
            console.log("MongoDb connection error, please try again"+ error)
            process.exit();
        })

    }
    catch(err){
       
        console.log("Something went wrong in connecting to MongoDB")
        console.log(err)
    }
}
