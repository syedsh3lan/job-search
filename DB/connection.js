import  mongoose from "mongoose";
//connect to the database
export const connection_db = async ()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_DB_URI)
        console.log("connected to the database");
    } catch (error) {
        console.log("error connection to the database");
    }
}