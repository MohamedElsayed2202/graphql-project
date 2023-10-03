import mongoose from "mongoose";

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB!);
        console.log("DB Connected");
    }catch(error){
        console.log("DB-Connection failed ", error);
    }
}
export default dbConnection;