import mongoose from "mongoose";

export default async function connectToDB(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");
    }catch(err){
        console.log(`Error is: ${err}`);
    }
}