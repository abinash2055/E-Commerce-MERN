import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_URI; 

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: "Ecommerce-NextJS", 
        bufferCommands: false,
      })
  }
  cached.conn = await cached.promise;
  console.log(
    "MongoDB connected to:",
    cached.conn.connection.db.databaseName
  );
  return cached.conn;
};
