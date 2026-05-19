import mongoose from "mongoose";

const DEFAULT_LOCAL_URI = "mongodb://127.0.0.1:27017/url_shortener";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || DEFAULT_LOCAL_URI;

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    console.log("Tried URI:", uri.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:***@"));
  }
};

export default connectDB;
