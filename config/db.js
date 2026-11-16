import mongoose from "mongoose";

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Connection Failed:", error.message);
        throw error;
    }
};

export default connectDB;