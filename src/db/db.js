import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect("mongodb+srv://shindepoonam1998:poonam1998@cluster0.zs53x3h.mongodb.net/videotube")
    console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("MONGODB Connection error", error);
    process.exit(1)
  }
}
export default connectDB