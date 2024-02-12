import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
export const connectDb = async () => {
  const mongoServer = await MongoMemoryServer.create();
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);

    con && console.log("mongoDb is connected");
  } catch (error) {
    console.log(error);
  }
};
