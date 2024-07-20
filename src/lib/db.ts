import mongoose from "mongoose";

// type hinting!!
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      };
    }
  }
}

// Check if the global object has been modified to include our mongoose object
const globalAny: any = global;

let cached = globalAny.mongoose;

if (!cached) {
  cached = globalAny.mongoose = { conn: null, promise: null };
}

const connect = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI is not defined in .env");
    throw new Error("MONGO_URI is not defined in .env");
  }

  if (cached.conn) {
    console.log("Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri)
      .then((mongoose) => {
        console.log("New database connection established");
        return mongoose.connection;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connect;
