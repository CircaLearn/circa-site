import mongoose from "mongoose";

const connect = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI is not defined in .env");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Successfully connected to mongodb!");
  } catch (error) {
    console.error("Failed to connect to mongodb.", error);
  }
};

export default connect;
