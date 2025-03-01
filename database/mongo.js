import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/todolist";

export async function connectdb() {
    if (mongoose.connection.readyState === 1) {
        console.log("✅ Already connected to MongoDB");
        return;
    }
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        throw new Error("MongoDB connection failed");
    }
}
